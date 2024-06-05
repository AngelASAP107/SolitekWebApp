const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DescripcionTicket extends Model {}

DescripcionTicket.init({
  descripcion_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha_notificacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'DescripcionTicket',
  tableName: 'DescripcionTicket'
});

module.exports = DescripcionTicket;
