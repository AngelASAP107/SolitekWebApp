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

exports.getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTechnicians = async (req, res) => {
  try {
    const tecnicos = await Usuario.findAll({ where: { id_rol: 2 } }); // Asumiendo que el rol 2 es de técnicos
    res.status(200).json(tecnicos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener técnicos', details: error.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clientes = await Usuario.findAll({ where: { id_rol: 3 } }); // Asumiendo que el rol 3 es de clientes
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes', details: error.message });
  }
};