const mongoose = require('mongoose');
const Reservacion = require('../models/Reservacion');
const Habitacion = require('../models/Habitacion');
const Usuario = require('../models/User');

const getReservations= async (req, res) => {
  // Obtener un cursor con todas las colecciones
  try {
    const reservaciones = await Reservacion.find();
    for (let reservacion of reservaciones) {
      let usuario = await Usuario.findOne({_id: reservacion.usuario});
      let habitacion = await Habitacion.findOne({_id: reservacion.habitacion});

      reservacion.usuario = usuario.correo;
      reservacion.habitacion = habitacion.numero;
    }
    return res.status(200).json(reservaciones);
  } 
  catch (error) {
    res.status(500).send(error.message);
  }
//  }
//  const getReservations= async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     const documents = await Reservation.find().skip(startIndex).limit(limit).toArray();
//     res.status(200).json({
//       data: documents,
//       currentPage: page,
//       totalPages: Math.ceil(await Reservation.countDocuments() / limit)
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
}

const postReservation = async (req,res) => {
  const {usuarioId,habitacionId,fechaInicio,fechaFin} = req.body;

  if (!usuarioId) {return res.status(400).send("Error. No se ingresó el usuario")};
  if (!habitacionId) {return res.status(400).send("Error. No se ingresó la habitación")};
  if (!fechaInicio) {return res.status(400).send("Error. No se ingresó la fecha de inicio")};
  if (!fechaFin) {return res.status(400).send("Error. No se ingresó la fecha de finalización")};

  try {
    const usuario = await Usuario.findOne({_id:usuarioId});
    if (!usuario) {return res.status(400).send("No se encontró el usuario en la BDD")};
    const habitacion = await Habitacion.findOne({_id:habitacionId});
    if (!habitacion) {return res.status(400).send("No se encontró la habitación en la BDD")};

    const data = new Reservacion ({usuario:usuarioId,habitacion:habitacionId,fechaInicio,fechaFin});
    res.status(201).json(await data.save());
  }
  catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send(error.message);
    }
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(500).send('Duplicate key error');
    }
    return res.status(500).send('Internal server error');
  }
};

const putReservation = async (req,res) => {
  const {reservacionId} = req.params;
  const {habitacionId,fechaFin,fechaInicio} = req.body;

  if (!reservacionId) {return res.status(400).send("Error. No se envió el ID de la reservación")};
  if (!habitacionId || !fechaFin || !fechaInicio) {return res.status(400).send("Error. No se enviaron los datos necesarios para actualizar")};
  
  try {
    const habitacion = await Habitacion.findOne({_id:habitacionId});
    if (!habitacion) {return res.status(400).send("No se encontró la habitación en la BDD")};

    const reservacion = await Reservacion.findOne({_id:reservacionId});
    if (!reservacion) {return res.status(400).send("No se encontró la reservación en la BDD")};

    reservacion.habitacion = habitacionId;
    reservacion.fechaFin = fechaFin;
    reservacion.fechaInicio = fechaInicio;
    
    return res.status(200).json(await reservacion.save());
  } 
  catch (error) {
    return res.status(500).send('Internal server error');
  }
};

 module.exports={getReservations,postReservation,putReservation};