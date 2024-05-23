const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ticket_system', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
