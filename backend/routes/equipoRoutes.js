const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

router.post('/add', equipoController.addEquipo);
router.get('/', equipoController.getEquipos);
router.put('/:id', equipoController.updateEquipo);
router.delete('/:id', equipoController.deleteEquipo);

module.exports = router;
