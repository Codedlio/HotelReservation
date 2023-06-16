const mongoose = require("mongoose");

const reservacionSchema = new mongoose.Schema({
  usuario: { type: String, ref: "Usuario", required: false },
  habitaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habitacion" }],
  servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Servicio" }],
  paquete: [{ type: mongoose.Schema.Types.ObjectId, ref: "Paqute"}],
  fechaInicio: { type: Date, required: false },
  fechaFin: { type: Date, required: false },
  activo: { type: Boolean, default: false },
  image: { type: Array },
  costo: { type: Number, required: false },
  //Mas campos
});

// Reservacion.find({ user: userId })

const Reservacion = mongoose.model("Reservacion", reservacionSchema);

module.exports = Reservacion;
