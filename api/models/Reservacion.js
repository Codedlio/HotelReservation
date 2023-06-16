const mongoose = require("mongoose");

const reservacionSchema = new mongoose.Schema({
  usuario: { type: String, ref: "Usuario", required: false },
  habitaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habitacion" }],
  servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Servicio" }],
 
});

// Reservacion.find({ user: userId })

const Reservacion = mongoose.model("Reservacion", reservacionSchema);

module.exports = Reservacion;
