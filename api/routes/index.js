const { Router } = require('express');

const hotelsRoute = require('./hotels.route')
const reservationsRoute = require('./reservations.route')



const router = Router();
router.use('/hotel', hotelsRoute)
router.use('/reservation', reservationsRoute)


module.exports=router;