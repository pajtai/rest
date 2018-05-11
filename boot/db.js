'use strict';

const mongoose = require('mongoose');
const logger = require('./logger');

const connection = mongoose.createConnection('mongodb://localhost/todos');

connection.then(
    () => logger.info('connected to Mongoose'),
    (error) => logger.error('Mongoose connection error', error)
);

module.exports = connection;
