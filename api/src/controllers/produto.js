const Produto = require('../models/_index').Produto;
const Token = require('../models/_index').Token;

//Adicionar um Produto ao banco de dados
exports.post = async (req, res) => {
    try {

        result = await Produto.create(req.body);
        res.status(201).json({
            message: "Produto cadastrado com sucesso!",
            result: result
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

//Buscar todos os Produtos no banco de dados
exports.get = async (req, res) => {

    const limit = parseInt(req.query.limit ? req.query.limit : 10);
    const page = parseInt(req.query.page ? req.query.page : 1);
    const offset = limit * (page - 1);

    try {
        totalProdutos = await Produto.findAndCountAll();
        paginatedProduto = await Produto.findAll({
            attributes: ['id', 'descricao', 'sku', 'imagemUrl', 'ativo', 'createdAt', 'updatedAt'],
            limit: limit,
            offset: offset,
            order: [
                ['id', 'DESC']
            ],
            include: [{
                model: Token,
                as: 'tokens'
            }]
        })
        res.status(200).json({
            message: 'Todos os Produtos foram buscados com sucesso!',
            count: totalProdutos.count,
            result: paginatedProduto
        })
    } catch (err) {
        res.status(400).json(err);
    }
}

//Buscar Produto pelo ID no banco de dados
exports.getById = async (req, res) => {

    const id = req.params.id;

    try {
        result = await Produto.findByPk(id, {
            attributes: ['id', 'descricao', 'sku', 'imagemUrl', 'ativo', 'createdAt', 'updatedAt'],
            include: [{
                model: Token,
                as: 'tokens'
            }]
        });

        if (result) {
            res.status(200).json({
                message: "Produto buscado com sucesso!",
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

//Atualizar Produto 
exports.put = async (req, res) => {

    const id = req.params.id;

    try {
        propertiesToUpdate = {
            descricao: req.body.descricao,
            sku: req.body.sku,
            imagemUrl: req.body.imagemUrl,
            ativo: req.body.ativo
        };

        result = await Produto.update(propertiesToUpdate, {
            where: {
                id: id
            }
        });

        produtoUpdated = await Produto.findByPk(id, {
            attributes: ['id', 'descricao', 'sku', 'imagemUrl', 'ativo', 'createdAt', 'updatedAt'],
        });

        if (result[0]) {
            res.status(200).json({
                updatedRows: result[0],
                message: "Produto atualizado com sucesso!",
                result: produtoUpdated
            })

        } else {
            res.status(400).json({
                message: "Nenhum produto foi atualizado"
            });
        }

    } catch (err) {
        res.status(400).json(err);
    }
}

//Deletar um Produto no banco de dados
exports.delete = async (req, res) => {

    const id = req.params.id;

    try {

        result = await Produto.destroy({
            where: {
                id: id
            }
        });

        res.status(200).json({
            message: "Produto removido com sucesso!",
            deletedRows: result
        })

    } catch (err) {
        res.status(400).json(err)
    }
}