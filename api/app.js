const express = require('express');
const cors=require('cors');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));


server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });
  

module.exports=server;