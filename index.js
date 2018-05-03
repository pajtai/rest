'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const pino = require('pino');
const logger = pino({
    level: process.env.LOG_LEVEL
});

const { version } = require('./package');

logger.info('starting app');
app.get('/version', (req, res) => {
    res.send({ version });
});
app.get('*', (req, res) => {
    res.status(404).send({ message: 'Resource not found' });
});

logger.info(`listening at http://localhost:${process.env.PORT}`);
app.listen(process.env.PORT);
