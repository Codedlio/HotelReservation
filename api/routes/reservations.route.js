
const {getReservaciones,postReservacion,putReservacion, deleteReservacion} = require('../controllers/controllerReservations');
const express =require('express')
const routerReservation=express.Router()

routerReservation
    .get('/', getReservaciones)
    .post('/', postReservacion)
    .put('/:id', putReservacion)
    .delete('/:id', deleteReservacion);

module.exports=routerReservation;
 
