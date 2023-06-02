const { Router } = require('express');

const hotelsRoute = require('./hotels.route')
const reservationsRoute = require('./reservations.route')
const {habitacionRouter} = require('./habitacionRoute')



const router = Router();
router.use('/hotel', hotelsRoute)
router.use('/reservation', reservationsRoute)
router.use('/habitacion', habitacionRouter)

module.exports=router;