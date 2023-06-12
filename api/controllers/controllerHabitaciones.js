const Habitacion = require("../models/Habitacion");
const Tipo_habitacion = require("../models/Tipo_habitacion");
const Reservacion = require('../models/Reservacion');
const { habitacionImage } = require("../cloudinary/cloudinary.js");
const fs = require("fs-extra");

const getHabitaciones = async (req, res) => {
  try {
    const habitaciones = await Habitacion.find({ activo: true });

    // for (let habitacion of habitaciones) {
    //     const {nombre} = await Tipo_habitacion.findOne({_id:habitacion.tipo});
    //     habitacion.tipo = nombre;
    // }
    return res.status(200).json(habitaciones);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getHabitacionById = async (req, res) => {
  let { id } = req.params;

  try {
    let habitacion = await Habitacion.findOne({ _id: id, activo: true });
    if (!habitacion) {
      return res.status(400).send("La habitación no existe");
    }
    let { nombre } = await Tipo_habitacion.findOne({ _id: habitacion.tipo });
    habitacion.tipo = nombre;
    return res.status(200).json(habitacion);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

const getHabitacionesDisponibles = async (req, res) => {
    let fechaInicio = req.query.fechaInicio;
    let fechaFin = req.query.fechaFin;
    
    fechaInicio = new Date(fechaInicio);
    fechaFin = new Date(fechaFin);
  
    try {
        let reservaciones = await Reservacion.find({
            $or: [
            { fechaInicio: { $lte: fechaFin }, fechaFin: { $gte: fechaInicio }},
            { fechaInicio: { $gte: fechaInicio, $lte: fechaFin }},
            { fechaFin: { $gte: fechaInicio, $lte: fechaFin }}
            ]
        });
        let habitaciones = await Habitacion.find({activo:true});
        
        for (let reservacion of reservaciones) {
            for (let habitacionReservada of reservacion.habitaciones) {
                let habitacion = habitaciones.find(a => a._id.equals(habitacionReservada));
                if (habitacion) {
                  habitacion.disponible = false;
                }
            }
        };
        return res.status(200).json(habitaciones);
    } 
    catch (error) {
        res.status(500).send(error.message);
    }
};

const postHabitacion = async (req,res) => {
    let {nombre, numero, tipoId, descripcion, capacidad, precio, puntuacion} = req.body;
    if (!nombre || !numero || !tipoId || !descripcion || !capacidad || !precio || !puntuacion) {return res.status(400).send("Error. No se enviaron los datos necesarios para crear la habitacion")};

  try {
    numero = Number(numero);
    capacidad = Number(capacidad);
    precio = Number(precio);
    puntuacion = Number(puntuacion);
    const data = new Habitacion({
      nombre,
      numero,
      tipo: tipoId,
      descripcion,
      capacidad,
      precio,
      puntuacion,
    });
    if (req.files) {
      for (const key of Object.keys(req.files)) {
        const file = req.files[key];
        const result = await habitacionImage(file.tempFilePath);
        data.image.push(result.secure_url);
        await fs.unlink(file.tempFilePath);
      }
    }

    return res.status(201).json(await data.save());
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send(error.message);
    }
    if (error.name === "MongoError" && error.code === 11000) {
      return res.status(500).send("Duplicate key error");
    }
    return res.status(400).send(error.message);
  }
};

const putHabitacion = async (req, res) => {
  const { id } = req.params;
  let {
    nombre,
    numero,
    tipoId,
    descripcion,
    capacidad,
    precio,
    puntuacion,
    disponible,
  } = req.body;

  if (
    !nombre ||
    !numero ||
    !tipoId ||
    !descripcion ||
    !capacidad ||
    !precio ||
    !puntuacion ||
    disponible === undefined
  ) {
    return res
      .status(400)
      .send("Error. No se enviaron los datos necesarios para actualizar");
  }
  try {
    let habitacion = await Habitacion.findOne({ _id: id, activo: true });
    if (!habitacion) {
      return res.status(400).send("La habitación no existe");
    }
    if (req.files) {
      for (const key of Object.keys(req.files)) {
        const file = req.files[key];
        const result = await habitacionImage(file.tempFilePath);
        data.image.push(result.secure_url);
        await fs.unlink(file.tempFilePath);
      }
    }
    habitacion.nombre = nombre;
    habitacion.numero = numero;
    habitacion.tipo = tipoId;
    habitacion.descripcion = descripcion;
    habitacion.capacidad = capacidad;
    habitacion.precio = precio;
    habitacion.puntuacion = puntuacion;
    let savedData = await habitacion.save();
    return res.status(200).json(savedData);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

const deleteHabitacion = async (req, res) => {
  const { id } = req.params;

  try {
    const habitacion = await Habitacion.findOne({ _id: id });
    if (!habitacion) {
      return res
        .status(400)
        .send("La habitación no existe o ya ha sido eliminada");
    }

        habitacion.activo = false;
        await habitacion.save();
        return res.status(200).send("Habitación eliminada exitosamente");
    } 
    catch (error) {
        return res.status(500).send('Internal server error');
    }
};

module.exports = {getHabitaciones,getHabitacionById,getHabitacionesDisponibles,postHabitacion,putHabitacion,deleteHabitacion};