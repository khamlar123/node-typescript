"use strict";
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

function swaggerOp(url: string) {
    const swaggerOptions = {
        swaggerDefinition: {
            info: {
                title: 'Welcome to api',
                description: "Copyright © 2025 khamlar All rights Reserved. Design by khamlar.",
                version: '1.0.0',
            },

        },
        apis: [`./${url}`]
    }

    return swaggerJsDoc(swaggerOptions);
}

module.exports = {
    swaggerUi,
    swaggerOp,
};