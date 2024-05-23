// controllers/userController.js

const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { nombre, correo_electronico, contrasena, telefono, id_rol } = req.body;

  if (!nombre || !correo_electronico || !contrasena || !id_rol) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    console.log('Datos recibidos:', req.body);

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    console.log('Hash generado:', hashedPassword);

    const newUser = await Usuario.create({
      nombre,
      correo_electronico,
      contrasena: hashedPassword,
      telefono,
      id_rol
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: error.message });
  }
};

// Nueva función para obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
