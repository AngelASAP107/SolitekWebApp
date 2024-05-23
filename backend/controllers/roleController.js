// controllers/roleController.js

const Rol = require('../models/rol');

exports.createRole = async (req, res) => {
  const { id_rol, descripcion } = req.body;

  if (!id_rol || !descripcion) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const newRole = await Rol.create({ id_rol, descripcion });
    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error de validación:', error); // Log del error completo en la consola
    res.status(500).json({ error: error.message, details: error.errors });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
