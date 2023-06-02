const Habitacion = require('../models/Habitacion');
const Tipo_habitacion = require('../models/Tipo_habitacion');

const getHabitaciones = async (req,res) => {
    try {
        const habitaciones = await Habitacion.find({activo:true});

        for (let habitacion of habitaciones) {
            const {nombre} = await Tipo_habitacion.findOne({_id:habitacion.tipo});
            habitacion.tipo = nombre;
        }
        return res.status(200).json(habitaciones);
    } 
    catch (error) {
        return res.status(500).send(error.message);
    }
};

const getHabitacionById = async (req,res) => {
    let {id} = req.params;

    try {
        let habitacion = await Habitacion.findOne({_id:id,activo:true});
        if (!habitacion) {return res.status(400).send("La habitación no existe")};
        let {nombre} = await Tipo_habitacion.findOne({_id:habitacion.tipo});
        habitacion.tipo = nombre;
    } 
    catch (error) {
        return res.status(500).send("Internal server error");
    }
};

const postHabitacion = async (req,res) => {
    const {nombre, numero, tipoId, descripcion, capacidad, precio, puntuacion} = req.body;
    if (!nombre || !numero || !tipoId || !descripcion || !capacidad || !precio || !puntuacion) {return res.status(400).send("Error. No se enviaron los datos necesarios para crear la habitacion")};

    try {
        const data = new Habitacion ({nombre,numero,tipo:tipoId,descripcion,capacidad,precio,puntuacion});
        return res.status(201).json(await data.save());
    } 
    catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error.message);
        }
        if (error.name === 'MongoError' && error.code === 11000) {
        return res.status(500).send('Duplicate key error');
        }
        return res.status(500).send('Internal server error');
    }
};

const putHabitacion = async (req,res) => {
    const {id} = req.params;
    const {nombre, tipoId, descripcion, capacidad, precio, puntuacion, disponible} = req.body;
    if (!nombre || !tipoId || !descripcion || !capacidad || !precio || !puntuacion || disponible === undefined) {return res.status(400).send("Error. No se enviaron los datos necesarios para actualizar")};

    try {
        const habitacion = await Habitacion.findOne({_id:id,activo:true});
        if (!habitacion) {return res.status(400).send("La habitación no existe")};

        habitacion.nombre = nombre;
        habitacion.tipo = tipoId;
        habitacion.descripcion = descripcion;
        habitacion.capacidad = capacidad;
        habitacion.precio = precio;
        habitacion.puntuacion = puntuacion;
        habitacion.disponible = disponible;
        return res.status(200).json(await habitacion.save());
    } 
    catch (error) {
        return res.status(500).send('Internal server error');
    }
};

const deleteHabitacion = async (req,res) => {
    const {id} = req.params;

    try {
        const habitacion = await Habitacion.findOne({_id:id});
        if (!habitacion) {return res.status(400).send("La habitación no existe o ya ha sido eliminada")};

        habitacion.activo = false;
        await habitacion.save();

        return res.status(200).send("Habitación eliminada exitosamente");
    } 
    catch (error) {
        return res.status(500).send('Internal server error');
    }
};

module.exports = {getHabitaciones,getHabitacionById,postHabitacion,putHabitacion,deleteHabitacion};