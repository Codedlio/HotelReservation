const express = require('express');
const cors=require('cors');
const routes = require('./routes/index.js');
const server = express();

server.use('/', routes);
server.use(express.json());
server.use(cors())

module.exports=server;