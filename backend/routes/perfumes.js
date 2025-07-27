const express = require('express');
const router = express.Router();
const Perfume = require('../models/Perfume');

// All perfumes
router.get('/', async (req, res) => {
  try {
    const perfumes = await Perfume.find();
    res.json(perfumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear 
router.post('/', async (req, res) => {
  try {
    const nuevoPerfume = new Perfume(req.body);
    const perfumeGuardado = await nuevoPerfume.save();
    res.status(201).json(perfumeGuardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Varios perfumes
router.post('/bulk', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'El body debe ser un array de perfumes' });
    }
    const perfumesGuardados = await Perfume.insertMany(req.body);
    res.status(201).json(perfumesGuardados);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar un perfume
router.put('/:id', async (req, res) => {
  try {
    const perfumeActualizado = await Perfume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!perfumeActualizado) return res.status(404).json({ error: 'Perfume no encontrado' });
    res.json(perfumeActualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un perfume
router.delete('/:id', async (req, res) => {
  try {
    const perfumeEliminado = await Perfume.findByIdAndDelete(req.params.id);
    if (!perfumeEliminado) return res.status(404).json({ error: 'Perfume no encontrado' });
    res.json({ mensaje: 'Perfume eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener un perfume por ID
router.get('/:id', async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id);
    if (!perfume) return res.status(404).json({ error: 'Perfume no encontrado' });
    res.json(perfume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 