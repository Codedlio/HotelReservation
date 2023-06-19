const {
  getServicios,
  postServicio,
  putServicio,
  deleteServicio,
  putActivarServicio,
} = require("../controllers/controllerServicios");
const express = require("express");
const routerServicios = express.Router();
const fileUpload = require("express-fileupload");
routerServicios
  .get("/", getServicios)
  .post(
    "/",
    fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
    postServicio
  )
  .put(
    "/:id",
    fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
    putServicio
  )
  .put("/activar/:id", putActivarServicio)
  .delete("/:id", deleteServicio);

module.exports = routerServicios;
