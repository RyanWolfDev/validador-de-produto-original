const Cliente = require('../models/_index').Cliente;
const Autorizacao = require('../models/_index').Autorizacao;
const Produto = require('../models/_index').Produto;
const Token = require('../models/_index').Token;

const { Op, where } = require("sequelize");

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const json2csv = require('json2csv');
const fs = require('fs');

//Adicionar um Cliente ao banco de dados
exports.post = async (req, res) => {
    try {

        //Valido se e-mail já está em uso
        emailExistente = await Cliente.findAll({
            where: {
                email: req.body.email
            }
        })

        if (emailExistente[0]) {
            throw { message: "Já existe uma conta cadastrada com esse E-mail!" }
        }

        if (req.body.senha !== req.body.confirmarSenha) {
            throw { message: "As senhas não são as mesmas! Por favor verifique." }
        }

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
    const filterSearch = req.query.filterSearch ? req.query.filterSearch : "";
    const offset = limit * (page - 1);
    let whereQuery = {};

    if (filterSearch) {
        whereQuery = {
            [Op.or]: [
                {
                    id:
                    {
                        [Op.substring]: filterSearch
                    }
                },
                {
                    nome:
                    {
                        [Op.substring]: filterSearch
                    }
                },
                {
                    email:
                    {
                        [Op.substring]: filterSearch
                    }
                }

            ]
        }
    }

    try {
        totalClientes = await Cliente.findAndCountAll({
            where: whereQuery
        });

        paginatedClientes = await Cliente.findAll({
            // attributes: ['id', 'nome', 'email', 'ativo', 'createdAt', 'updatedAt'],
            limit: limit,
            offset: offset,
            order: [
                ['id', 'DESC']
            ],
            include: [{
                model: Autorizacao,
                as: 'autorizacoes',
                include: {
                    model: Token,
                    as: 'token',
                    include: {
                        model: Produto,
                        as: 'produto',

                    }
                }
            }],
            where: whereQuery
        })
        res.status(200).json({
            message: 'Todos os Clientes foram buscados com sucesso!',
            count: totalClientes.count,
            currentPage: page,
            pageSize: limit,
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
            include: [{
                model: Autorizacao,
                as: 'autorizacoes',
                include: {
                    model: Token,
                    as: 'token',
                    include: {
                        model: Produto,
                        as: 'produto',

                    }
                }
            }],
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

    const id = req.userData.id

    try {
        propertiesToUpdate = {
            nome: req.body.nome,
            email: req.body.email,
        };

        //Se for atualização da senha do Profile
        if (req.body.senhaAtual && req.body.novaSenha) {

            clienteExistente = await Cliente.findAll({
                where: {
                    id: id
                }
            })

            clienteExistente = clienteExistente[0];

            if (!clienteExistente)
                throw { message: "Não foi possível alterar a senha do Cliente logado" }


            senhaIsEqual = await bcryptjs.compare(req.body.senhaAtual, clienteExistente.senha);

            if (!senhaIsEqual) {
                throw { message: "Senha atual incorreta!" }
            }

            const senhaHashed = await bcryptjs.hash(req.body.novaSenha, 10);
            propertiesToUpdate.senha = senhaHashed;

        } else if (req.body.senhaAtual || req.body.novaSenha) {
            throw { message: "Preencha os campos de Nova senha e Senha Atual para atualização de senha" }
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
                message: "Perfil atualizado com sucesso!",
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
            'SECRET_KEY_FOR_CLIENTE',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Cliente logado com sucesso!",
            cliente_id: clienteExistente.id,
            cliente_nome: clienteExistente.nome,
            token: token,
            expiresIn: 3600000
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
        res.header('Content-Type', 'text/csv');
        res.json(csv);

    } catch (err) {
        res.status(400).json(err);
    }
}