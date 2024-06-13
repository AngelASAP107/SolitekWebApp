const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para el login
router.post('/login', authController.login);

// Ruta para el cambio de contraseña
router.post('/change-password', authController.changePassword);

module.exports = router;
