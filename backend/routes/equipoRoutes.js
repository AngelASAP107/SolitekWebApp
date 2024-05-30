const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

router.post('/add', equipoController.addEquipo);
router.get('/', equipoController.getEquipos);

module.exports = router;
