const {getHabitaciones, getHabitacionById, getHabitacionesDisponibles, postHabitacion, putHabitacion, deleteHabitacion, putActivarHabitacion} = require('../controllers/controllerHabitaciones');
const express = require('express');
const fileUpload =require ("express-fileupload");

const routerHabitaciones = express.Router();

routerHabitaciones 
    .get('/', getHabitaciones)
    .get('/disponible', getHabitacionesDisponibles)
    .get('/:id', getHabitacionById)
    .post('/',fileUpload({ useTempFiles: true,
        tempFileDir: "./uploads" }), postHabitacion)
    .put('/:id', fileUpload({ useTempFiles: true,
        tempFileDir: "./uploads" }), putHabitacion)
    .put('/activar/:id', putActivarHabitacion)
    .delete('/:id', deleteHabitacion);

module.exports = routerHabitaciones;