const HistorialTicket = require('../models/historialTicket');
const Ticket = require('../models/ticket');
const DescripcionTicket = require('../models/descripcionTicket');
const Equipo = require('../models/equipo'); // Importar el modelo de Equipo
const Usuario = require('../models/usuario'); // Importar el modelo de Usuario
const { uploadImage } = require('../services/firebaseService'); // Importar el servicio de Firebase

exports.getTicketsByTechnician = async (req, res) => {
  const { id } = req.params;
  try {
    const tickets = await Ticket.findAll({
      where: { tecnico_id: id },
      include: [
        {
          model: HistorialTicket,
          include: [DescripcionTicket] // Incluir DescripcionTicket en HistorialTicket
        },
        {
          model: Equipo,
          as: 'equipo' // Incluir el modelo de Equipo
        }
      ]
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tickets del técnico', details: error.message });
  }
};

exports.addAdvance = async (req, res) => {
  const { id } = req.params;
  const { mensaje } = req.body;
  let imageUrl = null;

  if (req.file) {
    try {
      imageUrl = await uploadImage(req.file);
    } catch (error) {
      return res.status(500).json({ error: 'Error al subir la imagen', details: error.message });
    }
  }

  try {
    const descripcionTicket = await DescripcionTicket.create({
      mensaje,
      fecha_notificacion: new Date(),
      imagen: imageUrl // Añadir URL de la imagen a la descripción del ticket
    });
    const historialTicket = await HistorialTicket.create({
      ticket_id: id,
      descripcion_id: descripcionTicket.descripcion_id,
      imagen_url: imageUrl // Añadir URL de la imagen al historial del ticket
    });
    res.status(201).json(historialTicket);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el avance', details: error.message });
  }
};

exports.getAdvancesByTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const advances = await HistorialTicket.findAll({
      where: { ticket_id: id },
      include: [DescripcionTicket]
    });
    res.status(200).json(advances);
  } catch (error) {
    res.status (500).json({ error: 'Error al obtener los avances del ticket', details: error.message });
  }
};

exports.getTicketsByClient = async (req, res) => {
  const { id } = req.params;
  try {
    const tickets = await Ticket.findAll({
      where: { cliente_id: id },
      include: [
        {
          model: HistorialTicket,
          include: [DescripcionTicket]
        },
        {
          model: Equipo,
          as: 'equipo'
        },
        {
          model: Usuario,
          as: 'tecnico', // Incluir el técnico a cargo
          attributes: ['nombre'] // Seleccionar solo el nombre del técnico
        }
      ]
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tickets del cliente', details: error.message });
  }
};
