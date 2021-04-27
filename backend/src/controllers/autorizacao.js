const Token = require('../models/_index').Token;
const Cliente = require('../models/_index').Cliente;
const Autorizacao = require('../models/_index').Autorizacao;
const Produto = require('../models/_index').Produto;

//Adicionar uma Autorizacao ao banco de dados
exports.post = async (req, res) => {

    const cliente_id = req.userData ? req.userData.id : null;
    const token = req.body.token;

    try {
        //Valido se o cliente existe
        cliente = await Cliente.findByPk(cliente_id);
        if (!cliente) {
            throw { message: 'O Cliente precisa estar autenticado no sistema!' };
        }

        //Valido se o token existe
        tokenValido = await Token.findAll({
            where: {
                token: token
            }
        });

        //Posicao 0 pois o Token é Unique, nunca terá dois iguais
        tokenValido = tokenValido[0];

        if (!tokenValido) {
            res.status(200).json({
                message: "Token Inválido!",
            });
            return;
            // throw { message: 'Token Inválido!' };
        }

        //Valido se já existe alguma autorização com o token e cliente do body
        autorizacaoExistente = await Autorizacao.findAll({
            where: {
                cliente_id: cliente.id,
                token_id: tokenValido.id
            }
        })

        if (autorizacaoExistente[0]) {
            throw { message: 'Esse Token já possui um certificado!' };
        }

        //Crio a nova autorizacao
        const autorizacao = {
            cliente_id: cliente.id,
            token_id: tokenValido.id
        }

        createdAutorizacao = await Autorizacao.create(autorizacao);

        tokenObject = await Token.findByPk(createdAutorizacao.token_id, {
            include: {
                model: Produto,
                as: 'produto'
            }
        })

        result = createdAutorizacao.toJSON();
        result.token = tokenObject

        res.status(201).json({
            message: "Este é um produto Original!",
            result: result
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}

//Buscar todos as Autorizações no banco de dados pelo Adm Filtrando pelo cliente
exports.getFromAdm = async (req, res) => {

    const limit = parseInt(req.query.limit ? req.query.limit : 10);
    const page = parseInt(req.query.page ? req.query.page : 1);
    const offset = limit * (page - 1);

    const cliente_id = req.query.cliente_id;
    let whereQuery = {};

    if (cliente_id)
        whereQuery = { cliente_id: cliente_id }

    try {

        totalAutorizacao = await Autorizacao.findAndCountAll({
            where: whereQuery
        });

        paginatedAutorizacao = await Autorizacao.findAll({
            limit: limit,
            offset: offset,
            order: [
                ['id', 'DESC']
            ],
            include: [{
                model: Token,
                as: 'token',
                include: {
                    model: Produto,
                    as: 'produto'
                }
            }, {
                model: Cliente,
                as: 'cliente'
            }],
            where: whereQuery
        })

        res.status(200).json({
            message: 'Todos as Autorizações foram buscados com sucesso!',
            count: totalAutorizacao.count,
            currentPage: page,
            pageSize: limit,
            result: paginatedAutorizacao
        })

    } catch (err) {
        res.status(400).json(err);
    }
}

//Buscar todos as Autorizações no banco de dados pelo Cliente logado
exports.getFromCliente = async (req, res) => {

    const limit = parseInt(req.query.limit ? req.query.limit : 10);
    const page = parseInt(req.query.page ? req.query.page : 1);
    const offset = limit * (page - 1);

    const cliente_id = req.userData ? req.userData.id : null;
    let whereQuery = {};

    try {
        if (cliente_id)
            whereQuery = {
                cliente_id: cliente_id
            }
        else
            throw { message: "Você não está autenticado!" }

        totalAutorizacao = await Autorizacao.findAndCountAll({
            where: whereQuery
        });

        paginatedAutorizacao = await Autorizacao.findAll({
            limit: limit,
            offset: offset,
            order: [
                ['id', 'DESC']
            ],
            include: [{
                model: Token,
                as: 'token',
                include: {
                    model: Produto,
                    as: 'produto'
                }
            }, {
                model: Cliente,
                as: 'cliente'
            }],
            where: whereQuery
        })

        res.status(200).json({
            message: 'Todos as Autorizações foram buscadas com sucesso!',
            count: totalAutorizacao.count,
            currentPage: page,
            pageSize: limit,
            result: paginatedAutorizacao
        })

    } catch (err) {
        res.status(400).json(err);
    }
}

//Deletar uma Autorização no banco de dados
exports.delete = async (req, res) => {

    const id = req.params.id;
    const cliente_id = req.userData ? req.userData.id : null;

    try {

        if (!cliente_id) {
            throw { message: 'O Cliente precisa estar autenticado no sistema!' };
        }

        //Valido se a autorização pertence ao cliente logado
        autorizacaoDoCliente = await Autorizacao.findAll({
            where: {
                cliente_id: cliente_id,
                id: id
            }
        })

        if (!autorizacaoDoCliente[0]) {
            throw { message: 'Autorização não pertece ao Cliente logado!' };
        }

        // Deleto a Autorização
        result = await Autorizacao.destroy({
            where: {
                id: id
            }
        });

        res.status(200).json({
            message: "Autorização removida com sucesso!",
            deletedRows: result
        })

    } catch (err) {
        res.status(400).json(err)
    }
}