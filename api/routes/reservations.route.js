
const {getReservations,postReservation} = require('../controllers/controllerReservations');
const express =require('express')
const routerReservation=express.Router()

routerReservation
    .get('/', getReservations)
    .post('/', postReservation);

module.exports=routerReservation;
 
