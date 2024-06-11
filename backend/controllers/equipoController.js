const Equipo = require('../models/equipo');

exports.addEquipo = async (req, res) => {
  try {
    const { especificaciones, estado_equipo, servicio, observaciones } = req.body;

    // Validación de datos
    if (!especificaciones || !estado_equipo || !servicio) {
      return res.status(400).json({ error: 'Todos los campos excepto observaciones son requeridos.' });
    }

    // Verificar si ya existe un equipo con las mismas especificaciones
    const equipoExistente = await Equipo.findOne({ where: { especificaciones } });
    if (equipoExistente) {
      return res.status(400).json({ error: 'Ya existe un equipo con las mismas especificaciones.' });
    }

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
    console.error('Error al obtener equipos:', error);
    res.status(500).json({ error: 'Error al obtener equipos', details: error.message });
  }
};

exports.updateEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const { especificaciones, estado_equipo, servicio, observaciones } = req.body;

    // Validación de datos
    if (!especificaciones || !estado_equipo || !servicio) {
      return res.status(400).json({ error: 'Todos los campos excepto observaciones son requeridos.' });
    }

    const equipo = await Equipo.findByPk(id);
    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    // Verificar si ya existe un equipo con las mismas especificaciones
    const equipoExistente = await Equipo.findOne({ where: { especificaciones } });
    if (equipoExistente && equipoExistente.id_equipo !== id) {
      return res.status(400).json({ error: 'Ya existe un equipo con las mismas especificaciones.' });
    }

    await equipo.update({
      especificaciones,
      estado_equipo,
      servicio,
      observaciones
    });

    res.status(200).json(equipo);
  } catch (error) {
    console.error('Error al actualizar el equipo:', error);
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
    console.error('Error al eliminar el equipo:', error);
    res.status(500).json({ error: 'Error al eliminar el equipo', details: error.message });
  }
};
