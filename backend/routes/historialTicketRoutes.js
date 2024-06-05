const express = require('express');
const router = express.Router();
const historialTicketController = require('../controllers/historialTicketController');

router.get('/tecnico/:id', historialTicketController.getTicketsByTechnician);
router.post('/:id/avances', historialTicketController.addAdvance);
router.get('/:id/avances', historialTicketController.getAdvancesByTicket);

module.exports = router;
