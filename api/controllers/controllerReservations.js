const Reservacion = require('../models/Reservacion');
const Habitacion = require('../models/Habitacion');
const Servicio = require('../models/Servicio');
const Paquete = require('../models/Paquete');
const { checkReservation } = require("../config/sendgridEmail.js");


const getReservaciones= async (req, res) => {
  try {
    let reservaciones = await Reservacion.find();

if (!reservaciones) {
  return res.status(200).send("Not Found");
}

for (let reservacion of reservaciones) {
  let nombresHabitaciones = [];
  for (let habId of reservacion.habitaciones) {
    const habitacion = await Habitacion.findById(habId);
    if (habitacion && habitacion.nombre) {
      nombresHabitaciones.push(habitacion.nombre);
    }
  }

  let nombresPaquetes = [];
  for (let paqueteId of reservacion.paquetes) {
    const paquete = await Paquete.findById(paqueteId);
    if (paquete && paquete.nombre) {
      nombresPaquetes.push(paquete.nombre);
    }
  }

  let nombresServicios = [];
  for (let servicioId of reservacion.servicios) {
    const servicio = await Servicio.findById(servicioId);
    if (servicio && servicio.nombre) {
      nombresServicios.push(servicio.nombre);
    }
  }

  reservacion.nombres = {
    habitaciones: nombresHabitaciones,
    paquetes: nombresPaquetes,
    servicios: nombresServicios,
  };
}
    return res.status(200).json(reservaciones);
  } 
  catch (error) {
    res.status(500).send(error.message);
  }
 }
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
//}

const getReservacionById = async (req,res) => {
  const {id} = req.params;

  try {
    let reservacion = await Reservacion.findById(id);
    if (!reservacion || reservacion.activo === false) {return res.status(400).send("La reservación no existe")};

    let nombresHabitaciones = [];
    for (let habitacionId of reservacion.habitaciones) {
        const {nombre} = await Habitacion.findById(habitacionId);
        nombresHabitaciones.push(nombre);
    }

    let nombresPaquetes = [];
    for (let paqueteId of reservacion.paquete) {
      const {nombre} = await Paquete.findById(paqueteId);
      nombresPaquetes.push(nombre)
    };

    let nombresServicios = [];
    for (let servicioId of reservacion.servicios) {
        const {nombre} = await Servicio.findById(servicioId);
        nombresServicios.push(nombre);
    }

    reservacion.nombres = {};
    reservacion.nombres.habitaciones = nombresHabitaciones;
    reservacion.nombres.paquete = nombresHabitaciones;
    reservacion.nombres.servicios = nombresServicios;
    
    return res.status(200).json(reservacion);
  } 
  catch (error) {
      return res.status(500).send("Internal server error");
  }
};

const getReservacionByUsuario = async (req,res) => {
  const {usuario} = req.params;
  try {  
    let ReservaUsu = [];
    let reservacion = await Reservacion.find({usuario:usuario,activo:true,estado:"I"});       
    if (reservacion.length==0) {    
      return res.status(200).send(ReservaUsu)
    };
    let ReservacionDeUsuario=reservacion.slice(-1);  

    let arrHabitaciones = [];
    for (const habitacionId of ReservacionDeUsuario[0].habitaciones) {
      let obj = await Habitacion.findById(habitacionId);
      arrHabitaciones.push(obj)
    };

    let arrServicios = [];
    for (const servicioId of ReservacionDeUsuario[0].servicios) {
      let obj = await Servicio.findById(servicioId);
      arrServicios.push(obj)
    };

    let arrPaquetes = [];
    for (const paqueteId of ReservacionDeUsuario[0].paquetes) {
      let obj = await Paquete.findById(paqueteId);
      arrPaquetes.push(obj);
    };  

    ReservacionDeUsuario[0].habitaciones = arrHabitaciones;
    ReservacionDeUsuario[0].servicios = arrServicios;
    ReservacionDeUsuario[0].paquetes = arrPaquetes;
    return res.status(200).json(ReservacionDeUsuario);
  } 
  catch (error) {
      return res.status(500).send(error.message); 
  }
};

const postReservacion = async (req,res) => {
  let {usuarioCorreo,arrHabitacion,arrServicio,arrPaquete,fechaInicio,fechaFin,costo,nroPerson} = req.body;

  if (!usuarioCorreo || !fechaInicio || !fechaFin||!costo) {return res.status(400).send("Error. No se enviaron los datos necesarios para crear la reserva")};

  let fechaInicioParseado="";
  let fechaFinParseado="";
  let anio="";
  let mes="";
  let dia="";
  anio=fechaInicio.substring(0,4);  
  mes=fechaInicio.substring(5,7);  
  dia=fechaInicio.substring(8,10);
  fechaInicioParseado=mes +"/"+dia+"/"+anio;
  anio=fechaFin.substring(0,4);
  mes=fechaFin.substring(5,7);
  dia=fechaFin.substring(8,10);
  fechaFinParseado= mes +"/"+dia+"/"+anio;
 
  fechaInicio = new Date(fechaInicioParseado);
  fechaFin = new Date(fechaFinParseado);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  try {
    const data = new Reservacion ({usuario:usuarioCorreo,habitaciones:arrHabitacion,servicios:arrServicio,paquetes:arrPaquete,fechaInicio:fechaInicio,fechaFin:fechaFin,costo:costo,estado:'I',fechaReserva:today,nroPerson:nroPerson});
      
    let nombresHabitaciones = [];
      for (let habId of arrHabitacion ) {
       const habitacion = await Habitacion.findOne({_id:habId});
       nombresHabitaciones.push(habitacion.nombre);
      }

      let nombresPaquetes = [];
      for (let paqueteId of arrPaquete) {
       const paquete = await Paquete.findById(paqueteId);
       nombresPaquetes.push(paquete.nombre);
      }

      let nombresServicios = [];
      for (let servicioId of arrServicio) {
       const servicio = await Servicio.findById(servicioId);
       nombresServicios.push(servicio.nombre); 
      }

    await checkReservation({usuarioCorreo,nombresHabitaciones,nombresServicios,nombresPaquetes,fechaInicio,fechaFin,costo})
    await data.save();
    res.status(201).json("Se registró con éxito su reserva, pero esta pendiente el pago");
  }
  catch (error) {
    console.log("postReservacion-error");
    console.log(error);
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
  const {usuarioCorreo,arrHabitacion,arrServicio,arrPaquete,fechaInicio,fechaFin, estado} = req.body;
  
  try {
    const reservacion = await Reservacion.findByIdAndUpdate(id, { $set: { estado }});
    if (!reservacion) {return res.status(400).send("No se encontró la reservación en la BDD")};
    return res.status(200).json(reservacion);
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
  
}
const putActivarReserva = async (req,res) => {
    const { id } = req.params;
    
    try {
      const habitacion = await Reservacion.findOne({_id:id,activo:false});
      habitacion.activo = true;
      habitacion.save();
      return res.status(200).send("Se activó correctamente");
    } catch (error) {
      return res.status(500).send("Internal server error");
    }
  };


 module.exports={getReservaciones,getReservacionById,postReservacion,putReservacion,deleteReservacion,getReservacionByUsuario,putActivarReserva};