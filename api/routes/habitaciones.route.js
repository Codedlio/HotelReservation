const {getHabitaciones, getHabitacionById, postHabitacion, putHabitacion, deleteHabitacion, getHabitacionById} = require('../controllers/controllerHabitaciones');
const fileUpload = require ("express-fileupload");
const express = require('express');
const routerHabitaciones = express.Router();

routerHabitaciones 
    .get('/', getHabitaciones)
    .get('/:id', getHabitacionById)
    .post('/', fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), postHabitacion)
    .put('/:id', putHabitacion)
    .delete('/id', deleteHabitacion);

module.exports = routerHabitaciones;