const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipo = sequelize.define('Equipo', {
  equipo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imagen_url: {
    type: DataTypes.STRING
  },
  nombre_usuario: {
    type: DataTypes.STRING
  },
  fecha_ingreso: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  numero_orden: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  nombre_equipo: {
    type: DataTypes.STRING
  },
  numero_serie: {
    type: DataTypes.STRING
  },
  modelo: {
    type: DataTypes.STRING
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
});

module.exports = Equipo;
