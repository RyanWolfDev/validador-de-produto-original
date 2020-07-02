const express = require('express');
const router = express.Router(); //Gerenciar rotas

//Controller
const TokensController = require('../controllers/token');

//Middlewares
const checkAuthAdm = require('../middlewares/check-auth-adm');

//Rotas restritas aos Administradores
router.post('', checkAuthAdm, TokensController.post);
router.put('/:id', checkAuthAdm, TokensController.put);
router.get('', checkAuthAdm, TokensController.get);
router.get('/:id', checkAuthAdm, TokensController.getById);
router.delete('/:id', checkAuthAdm, TokensController.delete);

module.exports = router;