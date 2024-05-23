const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DescripcionTicket = sequelize.define('DescripcionTicket', {
  descripcion_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mensaje: {
    type: DataTypes.TEXT
  },
  fecha_notificacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = DescripcionTicket;
