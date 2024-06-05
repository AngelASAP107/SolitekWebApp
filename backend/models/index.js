const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Equipo = require('./equipo');
const Ticket = require('./ticket');
const Notificacion = require('./notificacion');
const HistorialTicket = require('./historialTicket');
const DescripcionTicket = require('./descripcionTicket');
const Rol = require('./rol');  // Asegúrate de que Rol esté incluido

// Define the associations
Ticket.belongsTo(Usuario, { as: 'cliente', foreignKey: 'cliente_id' });
Ticket.belongsTo(Usuario, { as: 'tecnico', foreignKey: 'tecnico_id' });
Ticket.belongsTo(Equipo, { as: 'equipo', foreignKey: 'equipo_id' });
Ticket.hasMany(HistorialTicket, { foreignKey: 'ticket_id' });

HistorialTicket.belongsTo(Ticket, { foreignKey: 'ticket_id' });
HistorialTicket.belongsTo(DescripcionTicket, { foreignKey: 'descripcion_id' });

module.exports = {
  sequelize,
  Usuario,
  Equipo,
  Ticket,
  Notificacion,
  HistorialTicket,
  DescripcionTicket,
  Rol  // Exportar Rol también
};
