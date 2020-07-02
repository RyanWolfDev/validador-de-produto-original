const express = require('express');
const router = express.Router(); //Gerenciar rotas

//Controller
const ProdutosController = require('../controllers/produto');

//Middlewares
const checkAuthAdm = require('../middlewares/check-auth-adm');

//Rotas restritas aos Administradores
router.post('', checkAuthAdm, ProdutosController.post);
router.put('/:id', checkAuthAdm, ProdutosController.put);
router.get('', checkAuthAdm, ProdutosController.get);
router.get('/:id', checkAuthAdm, ProdutosController.getById);
router.delete('/:id', checkAuthAdm, ProdutosController.delete);

module.exports = router;