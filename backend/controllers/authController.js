const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = 'mysecretkey'; // Debes usar una clave secreta segura en producción

exports.login = async (req, res) => {
  const { nombre, contrasena } = req.body;

  console.log('Login request received for:', nombre);

  try {
    const usuario = await Usuario.findOne({ where: { nombre } });
    console.log('Usuario encontrado:', usuario);

    if (!usuario) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    console.log('Contraseña correcta:', isMatch);

    if (!isMatch) {
      console.log('Contraseña incorrecta');
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario.usuario_id, rol: usuario.id_rol }, secret, { expiresIn: '1h' });
    console.log('Token generado:', token);

    res.json({ token, role: usuario.id_rol });
  } catch (error) {
    console.error('Error en el proceso de login:', error);
    res.status(500).json({ error: error.message });
  }
};
