
const {getReservations,postReservation,putReservation, deleteReservation} = require('../controllers/controllerReservations');
const express =require('express')
const routerReservation=express.Router()

routerReservation
    .get('/', getReservations)
    .post('/', postReservation)
    .put('/:id', putReservation)
    .delete('/:id', deleteReservation);

module.exports=routerReservation;
 
