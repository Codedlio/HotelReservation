const express = require('express');
const cors=require('cors');
const routes = require('./routes/index.js');
const server = express();

server.use(express.json());
server.use(cors());
server.use('/', routes);

module.exports=server;