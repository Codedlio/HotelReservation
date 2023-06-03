
const express = require('express');
const router = express.Router();
const {postLogin,postRegistro, putUsuario,getUsuario,deleteUsuario} = require('../controllers/controllerUsuarios');

// ...

// Ruta de inicio de sesión
router.post('/registro', postRegistro);

  // Ruta de cierre de sesión
  router.post('/login',postLogin);
  router.put('/usuario/:id',putUsuario);
  router.get('/usuario/:id',getUsuario);
  router.delete('/usuario/:id',deleteUsuario);
  
  module.exports = router;