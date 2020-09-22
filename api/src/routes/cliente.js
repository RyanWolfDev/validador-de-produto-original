const express = require('express');
const router = express.Router(); //Gerenciar rotas

//Controller
const ClientesController = require('../controllers/cliente');

//Middlewares
const checkAuthAdm = require('../middlewares/check-auth-adm');
const checkAuthCliente = require('../middlewares/check-auth-cliente');

//Rotas restritas aos Administradores
router.get('', checkAuthAdm, ClientesController.get);
router.get('/csv', checkAuthAdm, ClientesController.exportCsv);
router.get('/detail/:id', checkAuthAdm, ClientesController.getById);
router.put('/:id/admUpdate', checkAuthAdm, ClientesController.updateClienteAtivo);
// router.delete('/:id', checkAuthAdm, ClientesController.delete);

//Rotas restritas ao Cliente
router.post('/cadastrar', ClientesController.post);
router.get('/:id', checkAuthCliente, ClientesController.getById);
router.put('/:id', checkAuthCliente, ClientesController.put);

router.post('/login', ClientesController.login);

module.exports = router;