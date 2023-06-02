const {getPaquetes, getPaqueteById, postPaquete, putPaquete, deletePaquete} = require('../controllers/controllerPaquetes');
const express = require('express');
const routerPaquetes = express.Router();

routerPaquetes
    .get('/', getPaquetes)
    .get('/:id', getPaqueteById)
    .post('/', postPaquete)
    .put('/:id', putPaquete)
    .delete('/:id', deletePaquete);

module.exports = routerPaquetes;