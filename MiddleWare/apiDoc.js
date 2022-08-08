const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation for Amazon Clone",
    version: "1.0.0",
  },
  servers: [
    {
      url: "https://amazon-clone-deploy.herokuapp.com",
      description: "Production server",
    },
    {
      url: "http://localhost:3333",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./Routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

exports.apiDoc = [
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
];
