
const express = require('express');
const router = express.Router();
const {postLogin,postRegistro} = require('../controllers/controllerUsuarios');

// ...

// Ruta de inicio de sesión
router.post('/registro', postRegistro);
  
  // Ruta de cierre de sesión
  router.post('/login',postLogin);
  
  module.exports = router;