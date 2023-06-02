const Reservacion = require('../models/Reservacion');
const Paquete = require('../models/Paquete');
const Habitacion = require('../models/Habitacion');
const Usuario = require('../models/Usuario');
const Servicio = require('../models/Servicio');

const getReservaciones= async (req, res) => {
  try {
    const reservaciones = await Reservacion.find({activo:true});

    for (let reservacion of reservaciones) {
      let {correo} = await Usuario.findOne({_id: reservacion.usuario});
      
      let nombresHabitaciones = [];
      for (let habitacionId of reservacion.habitaciones) {
        let {nombre} = await Habitacion.find({_id:habitacionId});
        nombresHabitaciones.push(nombre);
      }

      let nombresServicios = [];
      for (let servicioId of reservacion.servicios) {
        let {nombre} = await Servicio.findOne({_id:servicioId});
        nombresServicios.push(nombre);
      }

      reservacion.usuario = correo;
      reservacion.habitaciones = nombresHabitaciones;
      reservacion.servicios = nombresServicios;
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

const getReservacionById = async (req,res) => {
  const {id} = req.params;

  try {
    let reservacion = await Reservacion.findOne({_id:id,activo:true});
    if (!reservacion) {return res.status(400).send("La reservación no existe")};

    let {correo} = await Usuario.findOne({_id: reservacion.usuario});

    let nombresHabitaciones = [];
    for (let habitacionId of reservacion.habitaciones) {
        const {nombre} = await Habitacion.find({_id:habitacionId});
        nombresHabitaciones.push(nombre);
    }

    let nombresServicios = [];
    for (let servicioId of reservacion.servicios) {
        const {nombre} = await Servicio.find({_id:servicioId});
        nombresServicios.push(nombre);
    }

    reservacion.usuario = correo;
    reservacion.habitaciones = nombresHabitaciones;
    reservacion.servicios = nombresServicios;
    
    return res.status(200).json(paquete);
} 
catch (error) {
    return res.status(500).send("Internal server error");
}
};

const postReservacion = async (req,res) => {
  const {usuarioId,arrIdHabitaciones,arrIdServicios,arrIdPaquetes,fechaInicio,fechaFin} = req.body;

  
  if (!usuarioId || !arrIdHabitaciones || !arrIdServicios || !arrIdPaquetes || !fechaInicio || !fechaFin) {return res.status(400).send("Error. No se enviaron los datos necesarios para crear la reserva")};
  
  try {
    const usuario = await Usuario.findOne({_id:usuarioId,activo:true});
    if (!usuario) {return res.status(400).send("No se encontró el usuario en la BDD")};

    const data = new Reservacion ({usuario:usuarioId,habitaciones:arrIdHabitaciones,servicios:arrIdServicios,paquetes:arrIdPaquetes,fechaInicio,fechaFin});
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

const putReservacion = async (req,res) => {
  const {id} = req.params;
  const {usuarioId,arrIdHabitaciones,arrIdServicios,arrIdPaquetes,fechaInicio,fechaFin} = req.body;

  if (!usuarioId || !arrIdHabitaciones || !arrIdServicios || !arrIdPaquetes || !fechaInicio || !fechaFin) {return res.status(400).send("Error. No se enviaron los datos necesarios para actualizar")};
  
  try {
    const reservacion = await Reservacion.findOne({_id:id,activo:true});
    if (!reservacion) {return res.status(400).send("No se encontró la reservación en la BDD")};
    
    reservacion.usuario = usuarioId;
    reservacion.habitaciones = arrIdHabitaciones;
    reservacion.servicios = arrIdServicios;
    reservacion.paquetes = arrIdPaquetes;
    reservacion.fechaFin = fechaFin;
    reservacion.fechaInicio = fechaInicio;
    
    return res.status(200).json(await reservacion.save());
  } 
  catch (error) {
    return res.status(500).send('Internal server error');
  }
};

const deleteReservacion = async (req,res) => {
  const {id} = req.params;

  try {
    const reservacion = await Reservacion.findOne({_id:id,activo:true});
    
    if (!reservacion) {return res.status(400).send("No se encontró el paquete en la BDD")};

    reservacion.activo = false;
    await reservacion.save();

    return res.status(200).send("Paquete eliminado exitosamente");
  } 
  catch (error) {
    return res.status(500).send('Internal server error');
  }
};

 module.exports={getReservaciones,getReservacionById,postReservacion,putReservacion,deleteReservacion};