const express = require("express");

const server = express();

const accountRouter = require('./accounts/accounts-router.js');

server.use(express.json());

server.use('/api/accounts', accountRouter);

module.exports = server;
