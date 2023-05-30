const mongoose = require('mongoose');
const Hotel= require('../models/Hotel')

const getIdHotel =async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
          return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(hotel);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

const getAllCollections =async (req, res) => {
    try {
        const db = mongoose.connection;
        const hotels = await Hotel.find().lean();
        const otherColeccion = await db.collection('reservation').find().toArray();
        
        const result = [...hotels, ...otherColeccion];
        
        res.status(200).json(result);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
        }
  
const postDataHotel= async (req, res) => {
    const{location, status, room, reservation}=req.body
    const data = new Hotel({
        location,
        status,
        room,
        reservation
    })

    try {
        const dataToSave =  await data.save();
        res.status(201).json(dataToSave)
    }
    catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
      }
      if (error.name === 'MongoError' && error.code === 11000) {
        return res.status(400).json({ message: 'Duplicate key error' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteHotel = async (req, res) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
module.exports= {getAllCollections, getIdHotel, postDataHotel, deleteHotel} ;