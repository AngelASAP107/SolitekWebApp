const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class HistorialTicket extends Model {}

HistorialTicket.init({
  historial_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descripcion_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'HistorialTicket',
  tableName: 'HistorialTicket'
});

module.exports = HistorialTicket;
