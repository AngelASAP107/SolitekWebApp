const express = require('express');
const router = express.Router();
const historialTicketController = require('../controllers/historialTicketController');
const { upload } = require('../services/firebaseService'); // Importar el middleware de carga

router.get('/tecnico/:id', historialTicketController.getTicketsByTechnician);
router.post('/:id/avances', upload.single('file'), historialTicketController.addAdvance); // Añadir el middleware de carga
router.get('/:id/avances', historialTicketController.getAdvancesByTicket);

module.exports = router;
