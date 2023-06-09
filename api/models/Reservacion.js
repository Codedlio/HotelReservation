const mongoose = require("mongoose");

const reservacionSchema = new mongoose.Schema({
  usuario: { type: String, ref: "Usuario", required: true },
  habitaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habitacion" }],
  servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Servicio" }],
  paquete: [{ type: mongoose.Schema.Types.ObjectId, ref: "Paquete" }],
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  activo: { type: Boolean, default: true },
  image: { type: Array },
  //Mas campos
});

// Reservacion.find({ user: userId })

const Reservacion = mongoose.model("Reservacion", reservacionSchema);

module.exports = Reservacion;
