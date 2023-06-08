const { Router } = require('express');

// const hotelsRoute = require('./hotels.route')
const reservationsRoute = require('./reservations.route')
const habitacionesRoute = require('./habitaciones.route')
const serviciosRoute = require('./servicios.route')
const usuariosRoute = require('./usuarios.route')
const paquetesRoute = require('./paquetes.route');
const Tipo_habitacion = require('../models/Tipo_habitacion');
const router = Router();

// router.use('/hotel', hotelsRoute)
router.use('/reservation', reservationsRoute)
router.use('/habitacion', habitacionesRoute)
router.use('/auth',usuariosRoute)
router.use('/servicio', serviciosRoute)
router.use('/paquete', paquetesRoute)

module.exports=router;