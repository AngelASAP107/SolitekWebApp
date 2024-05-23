const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notificacion = sequelize.define('Notificacion', {
  notificacion_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  leido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Notificacion;
