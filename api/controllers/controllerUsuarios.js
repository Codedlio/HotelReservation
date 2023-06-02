const auth = require('../config/firebase');
const Usuario= require('../models/Usuario');
const postLogin =   async (req, res) => {
    try {
      const { correo, contraseña, telefono,nombre } = req.body;
      const userRecord = await auth.createUser({
        correo,
        contraseña
        });
       // Crear documento de usuario en tu base de datos propia
    const nuevoUsuario = new Usuario({
        nombre,
        correo,
        telefono,
        activo
      });
      await nuevoUsuario.save();
  
      res.status(200).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
  }

const  postRegistro= async (req, res) => {
    try {
      const { email, contraseña } = req.body;
      const userRecord = await auth.signInWithEmailAndPassword(email, contraseña);
      res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
  }
  module.exports={postRegistro, postLogin};