'use strict';

require('dotenv').config();

const consign = require('consign');
const express = require('express');
const flatten = require('flat');
const server = express();
const helmet = require('helmet');
const pino = require('pino');
const logger = pino({
    level: process.env.LOG_LEVEL
});

logger.info('starting app');
server.use(helmet());

const app = {};

consign()
    .include('api')
    .into(app);

const flattened = flatten(app);

Object.entries(flattened).forEach(([route, router]) => {

    const baseRoute = `/${route.replace(/\.controller$/, '').replace(/\./g, '/')}`;

    logger.debug(`mounting router at: ${route}`);
    server.use(baseRoute, router);
});

server.get('*', (req, res) => {
    res.status(404).send({ message: 'Resource not found' });
});

logger.info(`listening at http://localhost:${process.env.PORT}`);
server.listen(process.env.PORT);
