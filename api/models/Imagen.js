
const mongoose = require('mongoose');


const imagenSchema = new mongoose.Schema({
    url: { type: String, required: true },
    // Otros campos 
    //Imagen.find({ habitacion: habitacionId });
  });

  const Imagen = mongoose.model('Imagen', imagenSchema);
  
module.exports =  Imagen;
  