// models/ticket.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Equipo = require('./equipo');

const Ticket = sequelize.define('Ticket', {
  ticket_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'activo', 'terminado', 'cancelado'),
    defaultValue: 'pendiente'
  },
  prioridad: {
    type: DataTypes.ENUM('baja', 'media', 'alta'),
    defaultValue: 'media'
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Usuarios',
      key: 'usuario_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  tecnico_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Usuarios',
      key: 'usuario_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  equipo_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Equipos',
      key: 'equipo_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  timestamps: true
});

module.exports = Ticket;
