const Resena = require("../models/Resena");

const Usuario= require('../models/Usuario');


const getResena = async (req, res) => {
  try {
    const Resenas = await Resena.find({});

    return res.status(200).json(Resenas);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const postResena = async (req, res) => {
    const { nombre, correo, puntuacion, descripcion } = req.body;
  
    if ( !nombre || !correo ||!puntuacion || !descripcion ) {
      return res
        .status(400)
        .send("Error. No se enviaron los datos necesarios para crear reseña");
    }
    try {

      const data = new Resena ({ nombre, correo, puntuacion, descripcion });
      return res.status(201).json(await data.save());

    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).send(error.message);
      }
      if (error.name === "MongoError" && error.code === 11000) {
        return res.status(500).send("Duplicate key error");
      }
      return res.status(500).json({message:error.messsage});
    }
  };


const deleteResena = async (req, res) => {
    const { id } = req.params;
    try {
      const resena = await Resena.findByIdAndDelete({ _id: id });
        if (!resena) return res.status(404).json({message: 'No hay datos'})
          
        return res.status(200).json(resena);
      } 
      catch (error) {
    return res.status(500).json({ message: error.message });
      }
  };
  
  const getEmailResena = async (req, res)=>{
    const { email } = req.params;
    try {
 
      const resenas = await Resena.find({correo: email});
    
      res.status(200).json(resenas);
    } catch (error) {
      res.status(500).json({ message: error.message });

    }
  }
  const getUsuarioEmail=async (req, res) => { 
    const { email } = req.params;
    try {
 
      const usuario = await Usuario.findOne({ correo:email }).select('-contraseña');
      console.log(usuario)
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: error.message });

    }
  }

module.exports = {getResena, getEmailResena,postResena, deleteResena, getUsuarioEmail }