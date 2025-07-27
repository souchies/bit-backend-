const mongoose = require('mongoose');

const perfumeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  marca: { type: String },
  aroma: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true }
});

module.exports = mongoose.model('Perfume', perfumeSchema);

/* imagen: { type: String }, // URL de la imagen */