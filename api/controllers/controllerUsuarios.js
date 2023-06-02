const auth = require('../config/firebase');
const Usuario= require('../models/Usuario');
const bcrypt = require('bcrypt');
const postRegistro =  async (req, res) => {
    try {
      const { correo, contraseña, telefono, nombre,activo } = req.body;
      if (!correo || !contraseña || !telefono || !nombre) {
  return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
      }
      // const userRecord = await auth.createUser({
      //   correo,
      //   contraseña
      //   });
       // Crear documento de usuario en tu base de datos propia
       const bcrypt = require('bcrypt');
       const saltRounds = 10;
       const hash = await bcrypt.hash(contraseña, saltRounds);
       const nuevoUsuario = new Usuario({
         nombre,
         correo,
         telefono,
         activo,
         contraseña: hash
       });
      await nuevoUsuario.save();
  
      res.status(200).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
  }

const  postLogin= async (req, res) => {
    try {
      const { correo, contraseña } = req.body;
      const usuario = await Usuario.findOne({ correo });
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
}
      const match = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!match) {
          return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }    else {
          return res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
}

      // const userRecord = await auth.signInWithEmailAndPassword(correo, contraseña);
      // res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
  }
  module.exports={postRegistro, postLogin};