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

    console.log('Comparing passwords:', contrasena, usuario.contrasena);
    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    console.log('Contraseña correcta:', isMatch);

    if (!isMatch) {
      console.log('Contraseña incorrecta');
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario.usuario_id, rol: usuario.id_rol }, secret, { expiresIn: '1h' });
    console.log('Token generado:', token);

    res.json({ 
      token, 
      user: { 
        usuario_id: usuario.usuario_id,  
        nombre: usuario.nombre,
        correo_electronico: usuario.correo_electronico, // Asegúrate de que todos los datos del usuario se incluyan aquí
        telefono: usuario.telefono,
        direccion: usuario.direccion, // Incluye cualquier otro campo relevante
        role: usuario.id_rol 
      } 
    });
  } catch (error) {
    console.error('Error en el proceso de login:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await Usuario.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.contrasena);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Contraseña actual incorrecta' });
    }

    const salt = await bcrypt.genSalt(10);
    user.contrasena = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
