const Equipo = require('../models/equipo');

exports.addEquipo = async (req, res) => {
  try {
    const { fecha, especificaciones, estado, servicio, observaciones } = req.body;
    const nuevoEquipo = await Equipo.create({
      fecha_ingreso: fecha,
      especificaciones: especificaciones,
      estado_equipo: estado,
      servicio: servicio,
      observaciones: observaciones
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
