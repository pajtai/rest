'use strict';

require('dotenv').config();

const express = require('express');
const flatten = require('flat');
const server = express();
const helmet = require('helmet');
const logger = require('./logger');

logger.info('starting app');
server.use(helmet());


require('./swagger')(server);

const connection = require('./db');
const app = require('./autoload')(connection);
const flattened = flatten(app.api);

/**
 * Remove .model from the keys.
 * Needs to be updated if models are put into sub directories
 */
Object.entries(app.models).forEach(([modelKey, model]) => {
    app.models[modelKey.replace(/.model$/, '')] = model;
});

Object.entries(flattened).forEach(([route, router]) => {

    const baseRoute = `/api/${route.replace(/\.controller$/, '').replace(/\./g, '/')}`;

    logger.debug(`mounting router at: ${route}`);
    server.use(baseRoute, router);
});

server.get('*', (req, res) => {
    res.status(404).send({ message: 'Resource not found' });
});

logger.info(`listening at http://localhost:${process.env.PORT}`);
server.listen(process.env.PORT);
