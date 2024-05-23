// models/rol.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rol = sequelize.define('Rol', {
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Rol;
