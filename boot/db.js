'use strict';

const mongoose = require('mongoose');

module.exports = (logger) => {
    const connection = mongoose.createConnection('mongodb://localhost/todos');

    connection.then(
        () => logger.info('connected to Mongoose'),
        (error) => logger.error('Mongoose connection error', error)
    );

    return connection;
};
