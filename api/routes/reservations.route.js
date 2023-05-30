
const getReservations=require('../controllers/getReservations');
const express =require('express')
const routerReservation=express.Router()

routerReservation.get('/', getReservations)

 module.exports=routerReservation;
 
