const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { nombre, correo_electronico, contrasena, telefono, id_rol } = req.body;

  if (!nombre || !correo_electronico || !contrasena || !id_rol) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    console.log('Datos recibidos:', req.body);

    const existingUser = await Usuario.findOne({ where: { nombre } });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya existe.' });
    }

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

exports.checkUserExistsByName = async (req, res) => {
  const { nombre } = req.query;
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre de usuario es requerido' });
  }

  try {
    const user = await Usuario.findOne({ where: { nombre } });
    res.status(200).json({ exists: !!user });
  } catch (error) {
    console.error('Error al verificar el nombre de usuario:', error);
    res.status(500).json({ error: 'Error al verificar el nombre de usuario' });
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
    const tecnicos = await Usuario.findAll({ where: { id_rol: 2 } });
    res.status(200).json(tecnicos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener técnicos', details: error.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clientes = await Usuario.findAll({ where: { id_rol: 3 } });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes', details: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo_electronico, contrasena, telefono, id_rol } = req.body;
    const user = await Usuario.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Preparar solo los campos que se deben actualizar
    const updatedFields = {
      nombre,
      correo_electronico,
      telefono,
      id_rol
    };

    // Solo actualizar la contraseña si se proporciona
    if (contrasena) {
      updatedFields.contrasena = await bcrypt.hash(contrasena, 10);
    }

    await user.update(updatedFields);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
