const mongoose = require('mongoose');
const Reservacion = require('../models/Reservacion');

const getReservations= async (req, res) => {
  // Obtener un cursor con todas las colecciones
  try {
    const db = mongoose.connection;
    const documents = await db.collection('reservation').find().toArray();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  const {usuario,habitacion,fechaInicio,fechaFin} = req.body;

  if (!usuario) {return res.status(400).send("Error. No se ingresó el usuario")};
  if (!habitacion) {return res.status(400).send("Error. No se ingresó la habitación")};
  if (!fechaInicio) {return res.status(400).send("Error. No se ingresó la fecha de inicio")};
  if (!fechaFin) {return res.status(400).send("Error. No se ingresó la fecha de finalización")};

  try {
    const data = new Reservacion ({usuario,habitacion,fechaInicio,fechaFin});
    res.status(201).json(await data.save());
  }
  catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate key error' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

 module.exports={getReservations,postReservation};