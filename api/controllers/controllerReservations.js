const Reservacion = require('../models/Reservacion');
const Habitacion = require('../models/Habitacion');
const Servicio = require('../models/Servicio');

const getReservaciones= async (req, res) => {
  try {
    const reservaciones = await Reservacion.find({activo:true});

    for (let reservacion of reservaciones) {
      
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

    reservacion.habitaciones = nombresHabitaciones;
    reservacion.servicios = nombresServicios;
    
    return res.status(200).json(paquete);
} 
catch (error) {
    return res.status(500).send("Internal server error");
}
};

const postReservacion = async (req,res) => {
  const {usuarioCorreo,arrHabitacion,arrServicio,arrPaquete,fechaInicio,fechaFin} = req.body;

  
  if (!usuarioCorreo || !fechaInicio || !fechaFin) {return res.status(400).send("Error. No se enviaron los datos necesarios para crear la reserva")};
  
  try {
    fechaInicio = new Date(fechaInicio);
    fechaFin = new Date(fechaFin);
    const data = new Reservacion ({usuario:usuarioCorreo,habitaciones:arrHabitacion,servicios:arrServicio,paquete:arrPaquete,fechaInicio,fechaFin});
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
  const {usuarioCorreo,arrHabitacion,arrServicio,arrPaquete,fechaInicio,fechaFin} = req.body;
  if (!usuarioCorreo || !fechaInicio || !fechaFin) {return res.status(400).send("Error. No se enviaron los datos necesarios para actualizar")};
  
  try {
    const reservacion = await Reservacion.findOne({_id:id,activo:true});
    if (!reservacion) {return res.status(400).send("No se encontró la reservación en la BDD")};
    
    reservacion.usuario = usuarioCorreo;
    reservacion.habitaciones = arrHabitacion;
    reservacion.servicios = arrServicio;
    reservacion.paquetes = arrPaquete;
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