const Ticket = require('../models/ticket');
const Usuario = require('../models/usuario');
const Equipo = require('../models/equipo');

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
    const tickets = await Ticket.findAll({
      include: [
        { model: Usuario, as: 'cliente' },
        { model: Usuario, as: 'tecnico' },
        { model: Equipo, as: 'equipo' }
      ]
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tickets', details: error.message });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id, {
      include: [
        { model: Usuario, as: 'cliente' },
        { model: Usuario, as: 'tecnico' },
        { model: Equipo, as: 'equipo' }
      ]
    });
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el ticket', details: error.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente, equipo, tecnico, fechaIngreso, estado, prioridad, tipoServicio } = req.body;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    await ticket.update({
      cliente_id: cliente,
      equipo_id: equipo,
      tecnico_id: tecnico,
      fecha_ingreso: fechaIngreso,
      estado,
      prioridad,
      tipo_servicio: tipoServicio
    });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el ticket', details: error.message });
  }
};

exports.completarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    await ticket.update({ estado: 'Completado' });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el ticket', details: error.message });
  }
};
