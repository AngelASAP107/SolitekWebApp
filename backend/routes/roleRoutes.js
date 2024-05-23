// routes/roleRoutes.js

const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.post('/roles', roleController.createRole);
router.get('/roles', roleController.getRoles);

module.exports = router;
