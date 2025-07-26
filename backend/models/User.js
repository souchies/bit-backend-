const mongoose = require('mongoose');

// Crea una conexión especial para usuarios
const userConnection = mongoose.createConnection('mongodb://localhost:27017/usuariosDB');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

// 
module.exports = userConnection.model('User', UserSchema);
