
const {getReservations,postReservation,putReservation} = require('../controllers/controllerReservations');
const express =require('express')
const routerReservation=express.Router()

routerReservation
    .get('/', getReservations)
    .post('/', postReservation)
    .put('/:id', putReservation);

module.exports=routerReservation;
 
