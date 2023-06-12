const { Router } = require('express');

// const hotelsRoute = require('./hotels.route')
const reservationsRoute = require('./reservations.route')
const habitacionesRoute = require('./habitaciones.route')
const serviciosRoute = require('./servicios.route')
const usuariosRoute = require('./usuarios.route')
const paquetesRoute = require('./paquetes.route');
const {resenaRoute,infoUsuarioRoute }= require('./resena.route');
const paymentRoute = require('./payment.route')
const router = Router();

// router.use('/hotel', hotelsRoute)
router.use('/reservation', reservationsRoute)
router.use('/habitacion', habitacionesRoute)
router.use('/auth',usuariosRoute)
router.use('/servicio', serviciosRoute)
router.use('/paquete', paquetesRoute)
router.use('/payment', paymentRoute)
router.use('/resena', resenaRoute)
router.use('/infoUsuario', infoUsuarioRoute)

module.exports=router;