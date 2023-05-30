const mongoose = require('mongoose');

const reservacionSchema = new mongoose.Schema({
  habitacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion', required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  huesped: {
    nombre: { type: String, required: true },
    direccion: { type: String },
    telefono: { type: String }
  }
});

const Reservacion = mongoose.model('Reservacion', reservacionSchema);

module.exports = Reservacion;
