const {
  getPaquetes,
  getPaqueteById,
  postPaquete,
  putPaquete,
  deletePaquete,
} = require("../controllers/controllerPaquetes");
const express = require("express");
const routerPaquetes = express.Router();
const fileUpload = require("express-fileupload");

routerPaquetes
  .get("/", getPaquetes)
  .get("/:id", getPaqueteById)
  .post(
    "/",
    fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
    postPaquete
  )
  .put("/:id", putPaquete)
  .delete("/:id", deletePaquete);

module.exports = routerPaquetes;
