const Equipo = require('../models/equipo');

exports.addEquipo = async (req, res) => {
  try {
    const { especificaciones, estado_equipo, servicio, observaciones } = req.body;
    const nuevoEquipo = await Equipo.create({
      especificaciones,
      estado_equipo,
      servicio,
      observaciones
    });
    res.status(201).json(nuevoEquipo);
  } catch (error) {
    console.error('Error al agregar el equipo:', error);
    res.status(500).json({ error: 'Hubo un problema al agregar el equipo.' });
  }
};

exports.getEquipos = async (req, res) => {
  try {
    const equipos = await Equipo.findAll();
    res.status(200).json(equipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener equipos', details: error.message });
  }
};

exports.updateEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const { especificaciones, estado_equipo, servicio, observaciones } = req.body;
    const equipo = await Equipo.findByPk(id);
    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    await equipo.update({
      especificaciones,
      estado_equipo,
      servicio,
      observaciones
    });
    res.status(200).json(equipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el equipo', details: error.message });
  }
};

exports.deleteEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const equipo = await Equipo.findByPk(id);
    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    await equipo.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el equipo', details: error.message });
  }
};
