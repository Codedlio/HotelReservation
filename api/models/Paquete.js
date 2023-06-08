const mongoose = require("mongoose");

const paqueteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  habitaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habitacion",
      required: true,
    },
  ],
  servicios: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Servicio", required: false }, //true
  ],
  costo: { type: Number, required: true },
  activo: { type: Boolean, default: true },
  image: { type: Array },
  //Mas campos
});

// Reservacion.find({ user: userId })

const Paquete = mongoose.model("Paquete", paqueteSchema);

module.exports = Paquete;
