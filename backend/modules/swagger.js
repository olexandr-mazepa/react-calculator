const fs = require('fs');
const path = require('path');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = (app, uiUrl, swaggerDocUrl, endpoints) => {

  const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: 'React calculator',
        version: '1.0.0'
      }
    },
    apis: endpoints
  });

  app.get(swaggerDocUrl, (req, res) => {
    res.send(swaggerSpec);
  });

  const html = fs.readFileSync(path.join(__dirname, '/swagger/swagger.css'));

  const options = {
    validatorUrl: null,
    defaultModelsExpandDepth: 0
  };
  app.use(uiUrl, swaggerUi.serve, swaggerUi.setup(swaggerSpec, false, options, html));

};
