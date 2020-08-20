const Token = require('../models/_index').Token;
const Produto = require('../models/_index').Produto;

const randomHash = require('random-hash');

//Adicionar um Token ao banco de dados
exports.post = async (req, res) => {

    const produto_id = req.body.produto_id;
    const quantidade = req.body.quantidade;
    const tokensCriados = [];

    try {

        //Valido se foi enviado as propriedades obrigatórias PRODUTO_ID e QUANTIDADE
        if (!produto_id || !quantidade) {
            throw { message: 'Produto e Quantidade obrigatórios' };
        }

        //Busco o produto pelo ID passado 8na requisição
        produto = await Produto.findByPk(produto_id, {
            attributes: ['id', 'sku', 'descricao'],
        });

        //Valido se o produto no ID passado existe
        if (!produto) {
            throw { message: 'Produto não encontrado' };
        }

        //Loop para criar varios tokens de acordo com a quantidade passada na requisição
        for (i = 0; i < quantidade; i++) {

            //Gero um token randomico
            const randomToken = randomHash.generateHash({ length: 6 });

            //Crio o objeto para Criar
            const token = {
                token: randomToken,
                produto_id: produto.id,
                ativo: true
            }

            //Retorno o meu Token com o Objeto de Produto
            tokensCriados.push(token);
        }

        result = await Token.bulkCreate(tokensCriados);

        res.status(201).json({
            message: "Token(s) cadastrado com sucesso!",
            tokensCreated: tokensCriados.length,
            result: result
        });

    } catch (err) {
        res.status(400).json(err);
    }
}

//Buscar todos os Tokens no banco de dados
exports.get = async (req, res) => {

    const limit = parseInt(req.query.limit ? req.query.limit : 10);
    const page = parseInt(req.query.page ? req.query.page : 1);
    const offset = limit * (page - 1);
    const filterSearch = req.query.filterSearch ? req.query.filterSearch : "";
    const produto_id = req.query.produto_id;
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
                    descricao:
                    {
                        [Op.substring]: filterSearch
                    }
                },
                {
                    sku:
                    {
                        [Op.substring]: filterSearch
                    }
                }
            ]
        }
    }

    if (produto_id)
        whereQuery = { produto_id: produto_id }

    try {

        totalTokens = await Token.findAndCountAll({
            where: whereQuery
        });
        
        paginatedTokens = await Token.findAll({
            limit: limit,
            offset: offset,
            order: [
                ['id', 'DESC']
            ],
            include: {
                model: Produto,
                as: 'produto'
            },
            where: whereQuery
        })
        res.status(200).json({
            message: 'Todos os Token foram buscados com sucesso!',
            count: totalTokens.count,
            currentPage: page,
            pageSize: limit,
            result: paginatedTokens
        })

    } catch (err) {
        res.status(400).json(err);
    }
}

//Buscar Token pelo ID no banco de dados
exports.getById = async (req, res) => {

    const id = req.params.id;

    try {
        result = await Token.findByPk(id, {
            include: { model: Produto, as: 'produto' }
        });

        if (result) {
            res.status(200).json({
                message: "Token buscado com sucesso!",
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

//Atualizar Token 
exports.put = async (req, res) => {

    const id = req.params.id;

    try {
        propertiesToUpdate = {
            ativo: req.body.ativo
        };

        result = await Token.update(propertiesToUpdate, {
            where: {
                id: id
            }
        });

        tokenUpdated = await Token.findByPk(id, {
            include: { model: Produto, as: 'produto' }
        });

        if (result[0]) {
            res.status(200).json({
                updatedRows: result[0],
                message: "Token atualizado com sucesso!",
                result: tokenUpdated
            })

        } else {
            res.status(400).json({
                message: "Nenhum Token foi atualizado"
            });
        }

    } catch (err) {
        res.status(400).json(err);
    }
}

//Deletar um Token no banco de dados
exports.delete = async (req, res) => {

    const id = req.params.id;

    try {

        result = await Token.destroy({
            where: {
                id: id
            }
        });

        res.status(200).json({
            message: "Token removido com sucesso!",
            deletedRows: result
        })

    } catch (err) {
        res.status(400).json(err)
    }
}