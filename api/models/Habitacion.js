const mongoose = require('mongoose');

const habitacionSchema = new mongoose.Schema({
  nombre: { type: Number, required: false },
  numero: { type: Number, required: false },
  //tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Tipo_habitacion', required: true },
  descripción: { type: String },
  capacidad: { type: Number, required: false},
  precio: { type: Number, required: false },
  puntuacion: { type: Number, required: false},
  disponible: { type: Boolean, default: false },
  activo: { type: Boolean, default:false},
  image:[],

});

const Habitacion = mongoose.model('Habitacion', habitacionSchema);


module.exports =  Habitacion;





// db.Habitaciones.insertOne({
//   numero: 101,
//   tipo: "individual",
//   precio: 100,
//   disponible: true
// })

// db.Habitaciones.insertOne({
//   numero: 201,
//   tipo: "doble",
//   precio: 150,
//   disponible: true
// })

// // Agregar más documentos de habitaciones según sea necesario
// db.createCollection("Reservaciones")

// db.Reservaciones.insertOne({
//   habitacionId: ObjectId("ID_DE_HABITACION"),
//   fechaInicio: ISODate("2023-06-01"),
//   fechaFin: ISODate("2023-06-05"),
//   huesped: {
//     nombre: "Juan Perez",
//     direccion: "Calle Principal 123",
//     telefono: "555-1234"
//   }
// })

// Agregar más documentos de reservaciones según sea necesario