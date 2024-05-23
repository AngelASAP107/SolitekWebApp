const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  usuario_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  id_rol: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Rols',
      key: 'id_rol'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  timestamps: true
});

module.exports = Usuario;
