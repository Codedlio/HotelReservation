
const fs = require ('fs-extra')
const {uploadImage, deleteImage}= require ('../cloudinary/cloudinary.js')
const Habitacion = require('../models/Habitacion')


const getAll=async(req, res)=>{
try {
    const date= await Habitacion.find({})

    res.status(201).json(date);
    
} catch (err) {
    res.status(400).json({ error: err.message });
}

}
const getId = async(req, res) => {
    const {id} = req.params

    try {
       if (!id) res.status(400).json({ error: err.message });
   const byId = new Habitacion.findById(id) 
    res.status(201).json(byId);
        
    } catch (err) {
    res.status(400).json({ error: err.message });
        
    }

}

const postHabitacion=async(req, res)=>{

        const { numero, tipo, precio, disponibilidad,
        descripción } = req.body;
      
        try {
          const newHabitacion= new Habitacion ({numero, tipo, precio, disponibilidad,
            descripción});
         
          if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            newHabitacion.image = {
              public_id: result.public_id,
              secure_url: result.secure_url
            }
            await fs.unlink(req.files.image.tempFilePath)
          }
          const savedProduct = await newHabitacion.save();
            return res.json(savedProduct);
        } catch (err) { 

        res.status(400).json({ error: err.message });
        }
}
const deleteHabitacion = async (req, res )=>{
    try {
        const { id } = req.params;
        const deletedHabitacion = await Habitacion.findByIdAndDelete(id);
    
        if (!deletedHabitacion) return res.status(404).json({message: 'Does not exists'})

    if (deletedHabitacion.image && deletedHabitacion.image.public_id) {
      await deleteImage(deletedHabitacion.image.public_id);
    }  
        
        return res.json(deletedHabitacion);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
  
}
module.exports={getAll, postHabitacion, deleteHabitacion, getId}