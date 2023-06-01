const {getHabitaciones, postHabitacion, putHabitacion, deleteHabitacion} = require('../controllers/controllerHabitaciones');
const express = require('express');
const routerHabitaciones = express.Router();

routerHabitaciones 
    .get('/', getHabitaciones)
    .post('/', postHabitacion)
    .put('/:id', putHabitacion)
    .delete('/id', deleteHabitacion);

module.exports = routerHabitaciones;