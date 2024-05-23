const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ticket = require('./ticket');
const DescripcionTicket = require('./descripcionTicket');

const HistorialTicket = sequelize.define('HistorialTicket', {
  notificacion_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ticket,
      key: 'ticket_id'
    }
  },
  descripcion_id: {
    type: DataTypes.INTEGER,
    references: {
      model: DescripcionTicket,
      key: 'descripcion_id'
    }
  }
});

Ticket.hasMany(HistorialTicket, { foreignKey: 'ticket_id' });
DescripcionTicket.hasMany(HistorialTicket, { foreignKey: 'descripcion_id' });
HistorialTicket.belongsTo(Ticket, { foreignKey: 'ticket_id' });
HistorialTicket.belongsTo(DescripcionTicket, { foreignKey: 'descripcion_id' });

module.exports = HistorialTicket;
