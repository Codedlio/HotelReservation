const {getHabitaciones, getHabitacionById, postHabitacion, putHabitacion, deleteHabitacion, getHabitacionById} = require('../controllers/controllerHabitaciones');
const express = require('express');
const routerHabitaciones = express.Router();

routerHabitaciones 
    .get('/', getHabitaciones)
    .get('/:id', getHabitacionById)
    .post('/', postHabitacion)
    .put('/:id', putHabitacion)
    .delete('/id', deleteHabitacion);

module.exports = routerHabitaciones;