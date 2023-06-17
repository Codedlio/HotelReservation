const {getResena,getEmailResena, postResena, deleteResena, getUsuarioEmail} = require('../controllers/controllerResenas');
const express =require('express')
const resenaRoute=express.Router()
const infoUsuarioRoute=express.Router()

resenaRoute
    .get('/', getResena)
    .get('/:email', getEmailResena)
    .post('/', postResena)
    .delete('/:id', deleteResena);

infoUsuarioRoute 
.get('/:email', getUsuarioEmail)

module.exports={resenaRoute, infoUsuarioRoute};
 
