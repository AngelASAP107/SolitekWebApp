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
  fecha_ingreso: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  tipo_servicio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prioridad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'usuario_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  tecnico_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'usuario_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  equipo_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Equipo,
      key: 'id_equipo'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  timestamps: true
});

Ticket.belongsTo(Usuario, { as: 'cliente', foreignKey: 'cliente_id' });
Ticket.belongsTo(Usuario, { as: 'tecnico', foreignKey: 'tecnico_id' });
Ticket.belongsTo(Equipo, { as: 'equipo', foreignKey: 'equipo_id' });

module.exports = Ticket;
