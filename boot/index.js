'use strict';

require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const logger = require('../services/logger')();


logger.info('app booting');

const server = express();
server.use(bodyParser.json());
server.use(helmet());

require('./swagger')(server);

const connection = require('./db');
const app = require('./autoload')(server, connection);

const httpServer = server.listen(process.env.PORT);
server.close = httpServer.close.bind(httpServer);

console.log(`\n\nListening at http://localhost:${process.env.PORT}`);
console.log('Swagger JSON is here: http://localhost:3333/api/api-docs.json');
console.log('Swagger UI is here: http://localhost:3333/api/api-docs/\n');

// Expose server for tests
module.exports = {
    app,
    server
};
