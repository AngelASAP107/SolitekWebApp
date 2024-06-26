const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, Rol, Usuario, Equipo, Ticket, Notificacion, HistorialTicket, DescripcionTicket } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const testRoutes = require('./routes/testRoutes');
const equipoRoutes = require('./routes/equipoRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const historialTicketRoutes = require('./routes/historialTicketRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

sequelize.sync({ force: true })
  .then(async () => {
    console.log('Database & tables created!');

    // Crear roles
    await Rol.bulkCreate([
      { id_rol: 1, descripcion: 'Administrador' },
      { id_rol: 2, descripcion: 'Tecnico' },
      { id_rol: 3, descripcion: 'Usuario' }
    ]);
    console.log('Roles creados!');

    // Crear usuarios de prueba
    await Usuario.bulkCreate([
      { nombre: 'Tech User 1', correo_electronico: 'tech1@example.com', contrasena: 'tech123', telefono: '1234567891', id_rol: 2 },
      { nombre: 'Tech User 2', correo_electronico: 'tech2@example.com', contrasena: 'tech123', telefono: '1234567892', id_rol: 2 },
      { nombre: 'Client User 1', correo_electronico: 'client1@example.com', contrasena: 'client123', telefono: '1234567893', id_rol: 3 },
      { nombre: 'Client User 2', correo_electronico: 'client2@example.com', contrasena: 'client123', telefono: '1234567894', id_rol: 3 }
    ]);
    console.log('Usuarios creados!');

    // Crear equipos de prueba
    await Equipo.bulkCreate([
      { especificaciones: 'Equipo 1', estado_equipo: 'nuevo', servicio: 'mantenimiento', observaciones: 'Ninguna' },
      { especificaciones: 'Equipo 2', estado_equipo: 'usado', servicio: 'reparacion', observaciones: 'Requiere cambio de pieza' }
    ]);
    console.log('Equipos creados!');
  });

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', testRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/historial-tickets', historialTicketRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
