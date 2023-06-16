
const express = require('express');
const router = express.Router();
const {postLogin,postRegistro, putUsuario, postNotification,getUsuario,deleteUsuario} = require('../controllers/controllerUsuarios');
const fileUpload =require ("express-fileupload");

// ...

// Ruta de inicio de sesión
router.post('/registro', postRegistro);

  // Ruta de cierre de sesión
  router.post('/login',postLogin);
  router.put('/usuario/:id', fileUpload({ useTempFiles: true,
    tempFileDir: "./uploads" }), putUsuario);
  router.get('/usuario',getUsuario);
  router.delete('/usuario/:id',deleteUsuario);
  router.post('/notification', postNotification )
  
  module.exports = router;