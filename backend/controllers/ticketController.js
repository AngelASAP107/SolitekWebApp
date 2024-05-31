// controllers/ticketController.js
const Ticket = require('../models/ticket');

exports.createTicket = async (req, res) => {
  try {
    const { cliente, equipo, tecnico, fechaIngreso, estado, prioridad, tipoServicio } = req.body;
    const newTicket = await Ticket.create({
      cliente_id: cliente,
      equipo_id: equipo,
      tecnico_id: tecnico,
      fecha_ingreso: fechaIngreso,
      estado,
      prioridad,
      tipo_servicio: tipoServicio
    });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el ticket', details: error.message });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tickets', details: error.message });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el ticket', details: error.message });
  }
};
