'use strict';

const consign = require('consign');

module.exports = (connection) => {
    const app = {
        connection
    };

    consign()
        .include('models')
        .include('api')
        .into(app);

    return app;
};
