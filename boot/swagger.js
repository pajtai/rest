'use strict';

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { version } = require('../package');

module.exports = (server) => {
    const options = {
        apis: ['./models/**/*.model.js', './api/**/*.controller.js'],
        swaggerDefinition: {
            info: {
                title: 'Todo API',
                version
            }
        }
    };

    // Initialize swagger-jsdoc -> returns validated swagger spec in json format
    const swaggerSpec = swaggerJSDoc(options);

    server.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Serve our json from express
    server.get('/api/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};

