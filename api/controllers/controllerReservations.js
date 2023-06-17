const Reservacion = require('../models/Reservacion');
const Habitacion = require('../models/Habitacion');
const Servicio = require('../models/Servicio');
const Paquete = require('../models/Paquete');
const { checkReservation } = require("../config/sendgridEmail.js");

const getReservaciones= async (req, res) => {
  try {
    let reservaciones = await Reservacion.find({activo:true});

    for (let reservacion of reservaciones) {
      let nombresHabitaciones = [];
      for (let habId of reservacion.habitaciones) {
        const habitacion = await Habitacion.findById(habId);
        nombresHabitaciones.push(habitacion.nombre);
      }

      let nombresPaquetes = [];
      for (let paqueteId of reservacion.paquete) {
        const paquete = await Paquete.findById(paqueteId);
        nombresPaquetes.push(paquete.nombre);
      }

      let nombresServicios = [];
      for (let servicioId of reservacion.servicios) {
        const servicio = await Servicio.findById(servicioId);
        nombresServicios.push(servicio.nombre); 
      }

      reservacion.nombres = {};
      reservacion.nombres.habitaciones = nombresHabitaciones;
      reservacion.nombres.paquetes = nombresPaquetes;
      reservacion.nombres.servicios = nombresServicios;
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

const getReservacionByUsuario = async (req,res) => {
  const {usuario} = req.params;
  try {
        
    let ReservaUsu = [];
    let reservacion = await Reservacion.find({usuario:usuario,activo:true,estado:'I'});       
    if (reservacion.length==0) {    
      return res.status(200).send(ReservaUsu)
    };
    let ReservacionDeUsuario=reservacion.slice(-1);        
    for (let habitacionId of ReservacionDeUsuario) {
        
        let hab=[];     
        let habFin=[];     
        for (let habId of habitacionId.habitaciones) { 
          let habitacionXReserva = await Habitacion.findOne({_id:habId});
          hab.push(habitacionXReserva);        
          
          for (let h of hab) {           
            var obj={
              _id:habId,
              nombre:h.nombre,
              capacidad: h.capacidad,
              precio: h.precio,
              image: h.image
            };        
          }
          habFin.push(obj);        
                  
        }
        let serv=[];     
        let servFin=[]; 
        for (let servId of habitacionId.servicios) {         
          
          let servXReserva = await Servicio.findOne({_id:servId});
          serv.push(servXReserva);    
          for (let s of serv) {           
            var obj={
              _id:servId,
              nombre:s.nombre,
              descripcion: s.descripcion,
              precio: s.precio
            };        
          }
          servFin.push(obj);        
                  
        }
        let paq=[];     
        let paqFin=[]; 
        for (let paqId of habitacionId.paquetes) { 
          let paqXReserva = await Paquete.findOne({_id:paqId});
          paq.push(paqXReserva);        
          console.log("paq");
          console.log(paq);
          for (let p of paq) {           
            var obj={
              _id:paqId,
              nombre:p.nombre,
              // capacidad: p.capacidad,
              precio: p.costo,
              image: p.image
            };        
          }
          paqFin.push(obj);        
                  
        }

        var objh={
          _id:habitacionId._id,
          usuario: habitacionId.usuario,
          fechaInicio: habitacionId.fechaInicio,
          fechaFin:habitacionId.fechaFin,
          image:habitacionId.image,
          costo:habitacionId.costo,
          Arrayhabitaciones:habFin,
          Arraypaquete:paqFin,
          ArrayServicio:servFin,
          fechaReserva:habitacionId.fechaReserva,
          nroPerson:habitacionId.nroPerson
        };  
    }
    ReservaUsu.push(objh);
    return res.status(200).json(ReservaUsu);
} 
catch (error) {
    return res.status(500).send("Internal server error");
}
};

const postReservacion = async (req,res) => {
  //let {usuarioCorreo,arrHabitacion,arrServicio,arrPaquete,fechaInicio,fechaFin,costo} = req.body;
  let {usuarioCorreo,arrHabitacion,arrServicio,arrPaquete,fechaInicio,fechaFin,costo,nroPerson} = req.body;

  if (!usuarioCorreo || !fechaInicio || !fechaFin||!costo) {return res.status(400).send("Error. No se enviaron los datos necesarios para crear la reserva")};
  
  //fechaInicio = new Date(fechaInicio);
  //fechaFin = new Date(fechaFin);
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
    
    //const data = new Reservacion ({usuario:usuarioCorreo,habitaciones:arrHabitacion,servicios:arrServicio,paquete:arrPaquete,fechaInicioParseado,fechaFinParseado,costo});
    const data = new Reservacion ({usuario:usuarioCorreo,habitaciones:arrHabitacion,servicios:arrServicio,paquetes:arrPaquete,fechaInicio:fechaInicio,fechaFin:fechaFin,costo:costo,estado:'I',fechaReserva:today,nroPerson:nroPerson});  
    //res.status(201).json(await data.save());
    await checkReservation({usuarioCorreo,arrHabitacion,arrServicio,arrPaquete,fechaInicio,fechaFin,costo})
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
  //if (!usuarioCorreo || !fechaInicio || !fechaFin) {return res.status(400).send("Error. No se enviaron los datos necesarios para actualizar")};
  
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
};

 module.exports={getReservaciones,getReservacionById,postReservacion,putReservacion,deleteReservacion,getReservacionByUsuario};