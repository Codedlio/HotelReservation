const {getServicios,postServicio,putServicio,deleteServicio,putActivarServicio} = require('../controllers/controllerServicios');
const express = require('express');
const routerServicios = express.Router();

routerServicios
    .get('/', getServicios)
    .post('/', postServicio)
    .put('/:id', putServicio)
    .put('/activar/:id', putActivarServicio)
    .delete('/:id', deleteServicio);

module.exports = routerServicios;