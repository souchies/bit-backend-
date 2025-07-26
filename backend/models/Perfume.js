const mongoose = require('mongoose');

const PerfumeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  aroma: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String }, // URL de la imagen
  stock: { type: Number, required: true },
  descripcion: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Perfume', PerfumeSchema); 