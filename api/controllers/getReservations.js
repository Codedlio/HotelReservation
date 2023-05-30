const mongoose = require('mongoose');

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
 module.exports=getReservations;