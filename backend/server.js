const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const Rol = require('./models/rol');
const Usuario = require('./models/usuario');
const Equipo = require('./models/equipo');
const Ticket = require('./models/ticket');
const Notificacion = require('./models/notificacion');
const HistorialTicket = require('./models/historialTicket');
const DescripcionTicket = require('./models/descripcionTicket');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

sequelize.sync({ force: true })
  .then(async () => {
    console.log('Database & tables created!');
    await Rol.bulkCreate([
      { id_rol: 1, descripcion: 'Administrador' },
      { id_rol: 2, descripcion: 'Tecnico' },
      { id_rol: 3, descripcion: 'Usuario' }
    ]);
    console.log('Roles creados!');
  });

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', testRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
