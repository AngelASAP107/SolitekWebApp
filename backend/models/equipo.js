const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipo = sequelize.define('Equipo', {
  id_equipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  especificaciones: {
    type: DataTypes.TEXT
  },
  estado_equipo: {
    type: DataTypes.STRING
  },
  servicio: {
    type: DataTypes.STRING
  },
  observaciones: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'Equipos'
});

module.exports = Equipo;
