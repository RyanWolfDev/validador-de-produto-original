const express = require('express');
const router = express.Router(); //Gerenciar rotas

//Controller
const AdmsController = require('../controllers/adm');

//Middlewares
const checkAuthAdm = require('../middlewares/check-auth-adm')

//Rotas restritas aos Administradores
router.post('', checkAuthAdm, AdmsController.post);
router.put('/:id', checkAuthAdm, AdmsController.put);
router.get('', checkAuthAdm, AdmsController.get);
router.get('/:id', checkAuthAdm, AdmsController.getById);
router.delete('/:id', checkAuthAdm, AdmsController.delete);

router.post('/login', AdmsController.login);


module.exports = router;