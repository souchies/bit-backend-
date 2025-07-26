const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Registrar usuario (existente)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username y contraseña son requeridos' });
    }
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Nuevo endpoint para listar usuarios 
router.get('/list', async (req, res) => {
  try {
    // Excluimos el password por seguridad
    const users = await User.find({}, { password: 0 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener usuarios: ' + err.message
    });
  }
});

module.exports = router;