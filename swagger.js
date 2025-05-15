const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API - Geri Rusk, Project 1 - CSE 341',
        description: 'Contacts API',
    },
    host: 'cse341-node-ofaz.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

//Generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc);
