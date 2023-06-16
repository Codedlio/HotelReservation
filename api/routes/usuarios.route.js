
const express = require('express');
const router = express.Router();
const {postLogin,postRegistro, putUsuario, postNotification,getUsuario,deleteUsuario,getUsuarioByCorreo} = require('../controllers/controllerUsuarios');

// ...

// Ruta de inicio de sesión
router.post('/registro', postRegistro);

  // Ruta de cierre de sesión
  router.post('/login',postLogin);
  router.put('/usuario/:id',putUsuario);
  router.get('/usuario',getUsuario);
  router.delete('/usuario/:id',deleteUsuario);
  router.post('/notification', postNotification );
  router.get('/correo/:correo', getUsuarioByCorreo)
  
  module.exports = router;