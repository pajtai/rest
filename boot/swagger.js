'use strict';

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
            tags: [
              {
                name: "Tasks",
                description: "Things to do."
              }
            ]
        },
        apis: ['./models/**/*.model.js', './api/**/*.controller.js'],
    };

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
    const swaggerSpec = swaggerJSDoc(options);

    server.get('/api/api-docs.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    server.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

};