
const fileUpload = require ("express-fileupload");
const express =require('express')
const {getAll, postHabitacion, deleteHabitacion, getId} = require ('../controllers/crudHabitacion')

const habitacionRouter = express.Router();
habitacionRouter
// retorna all habitacion
.get('/', getAll)
// Ruta para obtener un hotel por su ID
.get('/:id', getId)
// Ruta para crear un nuevo hotel
.post('/',fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), 
        postHabitacion)

.delete('/:id', deleteHabitacion);

module.exports = {habitacionRouter};