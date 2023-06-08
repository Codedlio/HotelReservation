const express = require('express');
const router = express.Router();
const createSession = require("../controllers/controllerPayment") ;


router.post("/", createSession);

module.exports=router;