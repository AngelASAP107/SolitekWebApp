// routes/testRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/test-hash', async (req, res) => {
  const { contrasena } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    res.status(200).json({ hashedPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
