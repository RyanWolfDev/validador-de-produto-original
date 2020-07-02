const Adm = require('../models/_index').Adm;

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Adicionar um ADM ao banco de dados
exports.post = async (req, res) => {
    try {

        //Valido se login de Adm já existe
        loginExistente = await Adm.findAll({
            where: {
                login: req.body.login
            }
        })

        if (loginExistente[0]) {
            throw { message: "Login já existente!" }
        }

        if (req.body.senha) {
            const senhaHashed = await bcryptjs.hash(req.body.senha, 10);
            req.body.senha = senhaHashed;
        }

        result = await Adm.create(req.body);
        res.status(201).json({
            message: "Administrador cadastrado com sucesso!",
            result: result
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

//Buscar todos os ADMs no banco de dados
exports.get = async (req, res) => {

    const limit = parseInt(req.query.limit ? req.query.limit : 10);
    const page = parseInt(req.query.page ? req.query.page : 1);
    const offset = limit * (page - 1);

    try {
        totalAdms = await Adm.findAndCountAll();
        paginatedAdms = await Adm.findAll({
            attributes: ['id', 'login', 'ativo', 'createdAt', 'updatedAt'],
            limit: limit,
            offset: offset,
            order: [
                ['id', 'DESC']
            ]
        })
        res.status(200).json({
            message: 'Todos os Administradores foram buscados com sucesso!',
            count: totalAdms.count,
            currentPage: page,
            pageSize: limit,
            result: paginatedAdms
        })
    } catch (err) {
        res.status(400).json(err);
    }
}

//Buscar Adm pelo ID no banco de dados
exports.getById = async (req, res) => {

    let id = req.params.id;

    try {
        result = await Adm.findByPk(id, {
            attributes: ['id', 'login', 'ativo', 'createdAt', 'updatedAt'],
        });

        if (result) {
            res.status(200).json({
                message: "Administrador buscado com sucesso!",
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

//Atualizar Adm 
exports.put = async (req, res) => {

    let id = req.params.id;

    try {
        propertiesToUpdate = {
            login: req.body.login,
            ativo: req.body.ativo
        };

        if (req.body.senha) {
            const senhaHashed = await bcryptjs.hash(req.body.senha, 10);
            propertiesToUpdate.senha = senhaHashed;
        }

        result = await Adm.update(propertiesToUpdate, {
            where: {
                id: id
            }
        });

        if (result[0]) {

            admUpdated = await Adm.findByPk(id, {
                attributes: ['id', 'login', 'ativo', 'createdAt', 'updatedAt'],
            });

            res.status(200).json({
                updatedRows: result[0],
                message: "Administrador atualizado com sucesso!",
                result: admUpdated
            })

        } else {
            res.status(400).json({
                message: "Nenhum Administrador foi atualizado"
            });
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

//Deletar um Adm no banco de dados
exports.delete = async (req, res) => {

    let id = req.params.id;

    try {
        result = await Adm.destroy({
            where: {
                id: id
            }
        });

        res.status(200).json({
            message: "Administrador removido com sucesso!",
            deletedRows: result
        })

    } catch (err) {
        res.status(400).json(err)
    }



}

//Logar um Adm 
exports.login = async (req, res) => {

    const login = req.body.login;
    const senha = req.body.senha;

    try {

        //Valido se o Login de Adm já existe 
        admExistente = await Adm.findAll({
            where: {
                login: login
            }
        })

        admExistente = admExistente[0];

        if (!admExistente)
            throw { message: "Login ou senha inválidos" }

        //Valido se as senhas sao iguais
        senhaIsEqual = await bcryptjs.compare(senha, admExistente.senha);

        if (!senhaIsEqual) {
            throw { message: "Login ou senha inválidos" }
        }

        //Crio um token com os dados do Adm
        const token = await jwt.sign({
            login: admExistente.login,
            id: admExistente.id
        },
            'LUCAS_COTRIM_DEV',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Administrador logado com sucesso!",
            adm_id: admExistente.id,
            token: token,
            expiresIn: 3600000

        })

    } catch (err) {
        res.status(401).json(err)
    }
}