const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  contraseña: { type: String, required: true },
  // Otros campos según tus necesidades
});

const User = mongoose.model('User', usuarioSchema);

module.exports = User;
