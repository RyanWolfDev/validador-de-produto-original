const Cliente = require('../models/_index').Cliente;

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const json2csv = require('json2csv');
const fs = require('fs');

//Adicionar um Cliente ao banco de dados
exports.post = async (req, res) => {
    try {

        if (req.body.senha) {
            const senhaHashed = await bcryptjs.hash(req.body.senha, 10);
            req.body.senha = senhaHashed;
        }

        result = await Cliente.create(req.body);
        res.status(201).json({
            message: "Cliente cadastrado com sucesso!",
            result: result
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

//Buscar todos os Clientes no banco de dados
exports.get = async (req, res) => {

    const limit = parseInt(req.query.limit ? req.query.limit : 10);
    const page = parseInt(req.query.page ? req.query.page : 1);
    const offset = limit * (page - 1);

    try {
        totalClientes = await Cliente.findAndCountAll();
        paginatedClientes = await Cliente.findAll({
            attributes: ['id', 'nome', 'email', 'ativo', 'createdAt', 'updatedAt'],
            limit: limit,
            offset: offset,
            order: [
                ['id', 'DESC']
            ]
        })
        res.status(200).json({
            message: 'Todos os Clientes foram buscados com sucesso!',
            count: totalClientes.count,
            result: paginatedClientes
        })
    } catch (err) {
        res.status(400).json(err);
    }
}

//Buscar Cliente pelo ID no banco de dados
exports.getById = async (req, res) => {

    const id = req.params.id;

    try {
        result = await Cliente.findByPk(id, {
            attributes: ['id', 'nome', 'email', 'ativo', 'createdAt', 'updatedAt'],
        });

        if (result) {
            res.status(200).json({
                message: "Cliente buscado com sucesso!",
                result: result
            });
        } else {
            result = {};
            res.status(200).json({
                result: result
            });
        }
    } catch (err) {
        res.status(200).json(err);
    }

}

//Atualizar Cliente 
exports.put = async (req, res) => {

    const id = req.params.id;

    try {
        propertiesToUpdate = {
            nome: req.body.nome,
            email: req.body.email,
            ativo: req.body.ativo
        };

        if (req.body.senha) {
            const senhaHashed = await bcryptjs.hash(req.body.senha, 10);
            propertiesToUpdate.senha = senhaHashed;
        }

        result = await Cliente.update(propertiesToUpdate, {
            where: {
                id: id
            }
        });

        if (result[0]) {

            clientepdated = await Cliente.findByPk(id, {
                attributes: ['id', 'nome', 'email', 'ativo', 'createdAt', 'updatedAt'],
            });

            res.status(200).json({
                updatedRows: result[0],
                message: "Cliente atualizado com sucesso!",
                result: clientepdated
            })

        } else {
            res.status(400).json({
                message: "Nenhum Cliente foi atualizado"
            });
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

//Deletar um Cliente no banco de dados
exports.delete = async (req, res) => {

    const id = req.params.id;

    try {

        result = await Cliente.destroy({
            where: {
                id: id
            }
        });

        res.status(200).json({
            message: "Cliente removido com sucesso!",
            deletedRows: result
        })

    } catch (err) {
        res.status(400).json(err)
    }

}

//Logar um Cliente 
exports.login = async (req, res) => {

    const email = req.body.email;
    const senha = req.body.senha;

    try {

        //Valido se o Login de Cliente já existe 
        clienteExistente = await Cliente.findAll({
            where: {
                email: email
            }
        })

        clienteExistente = clienteExistente[0];

        if (!clienteExistente)
            throw { message: "E-mail ou senha inválidos" }

        //Valido se as senhas sao iguais
        senhaIsEqual = await bcryptjs.compare(senha, clienteExistente.senha);

        if (!senhaIsEqual) {
            throw { message: "E-mail ou senha inválidos" }
        }

        //Crio um token com os dados do Cliente
        const token = await jwt.sign({
            email: clienteExistente.email,
            id: clienteExistente.id
        },
            'LUCAS_COTRIM_DEV',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Cliente logado com sucesso!",
            cliente_id: clienteExistente.id,
            token: token
        })

    } catch (err) {
        res.status(401).json(err)
    }
}

//Buscar todos os Clientes no banco de dados
exports.exportCsv = async (req, res) => {

    try {
        const fields = ['id', 'nome', 'email', 'ativo', 'createdAt', 'updatedAt'];
        const opts = { fields };
        const path = 'public/' + Date.now() + '.csv';

        todosClientes = await Cliente.findAll({
            attributes: fields,
            order: [
                ['id', 'DESC']
            ]
        })

        const csv = await json2csv.parseAsync(todosClientes, opts);

        await fs.writeFile(path, csv, function (err, data) {
            if (err) {
                throw 'Não foi possível exportar os Clientes';
            }
            else {
                console.log('Arquivo Csv criado');
                setTimeout(function () {
                    fs.unlinkSync(path);
                }, 5000)
                res.status(200).download(path);
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
}