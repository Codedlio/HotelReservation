const {getHabitaciones, getHabitacionById, getHabitacionesDisponibles, postHabitacion, putHabitacion, deleteHabitacion} = require('../controllers/controllerHabitaciones');
const express = require('express');
const fileUpload =require ("express-fileupload");

const routerHabitaciones = express.Router();

routerHabitaciones 
    .get('/', getHabitaciones)
    .get('/:id', getHabitacionById)
    .get('/disponible', getHabitacionesDisponibles)
    .post('/',fileUpload({ useTempFiles: true,
        tempFileDir: "./uploads" }), postHabitacion)
    .put('/:id', putHabitacion)
    .delete('/id', deleteHabitacion);

module.exports = routerHabitaciones;