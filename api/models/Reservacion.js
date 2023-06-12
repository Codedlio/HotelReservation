const mongoose = require("mongoose");

const reservacionSchema = new mongoose.Schema({
  usuario: { type: String, ref: "Usuario", required: true },
  habitaciones: { type: Array, ref: "Habitacion" },
  servicios: { type: Array, ref: "Servicio" },
  paquete: { type: Array, ref: "Paqute"},
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  activo: { type: Boolean, default: true },
  image: { type: Array },
  costo: { type: Number, required: true },
  //Mas campos
});

// Reservacion.find({ user: userId })

const Reservacion = mongoose.model("Reservacion", reservacionSchema);

module.exports = Reservacion;
