const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.get('/', userController.getUsers);
router.get('/tecnicos', userController.getTechnicians);
router.get('/clientes', userController.getClients);
router.get('/check-username', userController.checkUserExistsByName); // Nueva ruta para verificar nombre de usuario
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
