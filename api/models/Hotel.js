const mongoose = require('mongoose');


const miSchema = new mongoose.Schema({
  location: {
    required: true,
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  room: { 
    required: true,
    type: Number
  },
  reservation: {
    type: Date,
    
  },
  image1:{ secure_url: String, public_id: String },
  image2:{ secure_url: String, public_id: String },
  image3:{ secure_url: String, public_id: String },
});

const Hotel = mongoose.model('Hotel', miSchema);
// const newHotel= new Hotel({
//     location: 'jupiter',
//     status:false,
//     room: 34,
//     reservation: 21-09-2020,
// })
// Guardar el documento en la base de datos
// newHotel.save()
//   .then((doc) => {
//     console.log('Documento guardado:', doc);
//   })
//   .catch((error) => {
//     console.error('Error al guardar el documento:', error);
//   });

module.exports = Hotel;
