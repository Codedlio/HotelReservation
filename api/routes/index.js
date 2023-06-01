const { Router } = require('express');

const hotelsRoute = require('./hotels.route')
const reservationsRoute = require('./reservations.route')
const habitacionesRoute = require('./habitaciones.route')
const serviciosRoute = require('./servicios.route')

const router = Router();
router.use('/hotel', hotelsRoute)
router.use('/reservation', reservationsRoute)
router.use('/habitacion', habitacionesRoute)
router.use('/servicio', serviciosRoute)


module.exports=router;