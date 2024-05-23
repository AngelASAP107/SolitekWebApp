// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);

// Nueva ruta para obtener todos los usuarios
router.get('/', userController.getUsers);

module.exports = router;
