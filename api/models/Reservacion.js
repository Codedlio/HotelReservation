const mongoose = require('mongoose');

const mongoose = require('mongoose');

const reservacionSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  habitacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion', required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  //Mas campos
});

// Reservacion.find({ user: userId })

const Reservacion = mongoose.model('Reservacion', reservacionSchema);

module.exports = Reservacion;
