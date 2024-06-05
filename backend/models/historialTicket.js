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
  },
  imagen_url: {  // Añadir este campo para almacenar la URL de la imagen
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'HistorialTicket',
  tableName: 'HistorialTicket'
});

module.exports = HistorialTicket;
