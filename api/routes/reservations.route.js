
const {getReservaciones,postReservacion,putReservacion, deleteReservacion,getReservacionByUsuario} = require('../controllers/controllerReservations');
const express =require('express')
const routerReservation=express.Router()

routerReservation
    .get('/', getReservaciones)
    .get('/:usuario', getReservacionByUsuario)
    .post('/', postReservacion)
    .put('/:id', putReservacion)
    .delete('/:id', deleteReservacion);

module.exports=routerReservation;
 
