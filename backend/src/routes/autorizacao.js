const express = require('express');
const router = express.Router(); //Gerenciar rotas

//Controller
const AutorizacaoController = require('../controllers/autorizacao');

//Middlewares
const checkAuthAdm = require('../middlewares/check-auth-adm');
const checkAuthCliente = require('../middlewares/check-auth-cliente');

//Rotas restritas aos Administradores
router.get('/adm', checkAuthAdm, AutorizacaoController.getFromAdm);

//Rotas restritas ao Clientes
router.post('', checkAuthCliente, AutorizacaoController.post);
router.get('', checkAuthCliente, AutorizacaoController.getFromCliente);
router.delete('/:id', checkAuthCliente, AutorizacaoController.delete);

module.exports = router;