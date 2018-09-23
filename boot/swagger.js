'use strict';

const swaggerJSDoc = require('swagger-jsdoc');

module.exports = server => {


    const options = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: 'Todo API', // Title (required)
                version: '0.0.0', // Version (required)
            },
            servers:  [
              {url: '/api/v1',
              description: 'Live Server'},
              {url: '/api/v2',
                description: 'Staging Server'},
            ],
            security: [
              {
                api_key: []
              }
            ]
        },
        apis: ['./boot/autoload.js', './models/**/*.model.js', './api/**/*.controller.js'], // Path to the API docs
    };

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
    const swaggerSpec = swaggerJSDoc(options);

    server.get('/api/api-docs.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    const swaggerUi = require('swagger-ui-express');
    server.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

};