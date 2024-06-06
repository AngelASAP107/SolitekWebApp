const express = require('express');
const router = express.Router();
const historialTicketController = require('../controllers/historialTicketController');
const { upload } = require('../services/firebaseService');

router.get('/tecnico/:id', historialTicketController.getTicketsByTechnician);
router.get('/cliente/:id', historialTicketController.getTicketsByClient); // Asegúrate de que esta ruta está definida
router.post('/:id/avances', upload.single('file'), historialTicketController.addAdvance);
router.get('/:id/avances', historialTicketController.getAdvancesByTicket);

module.exports = router;