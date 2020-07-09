const fs = require('fs');
const path = require('path');


/**
 * Init routes.
 * Load all routes from directory "v".
 *
 * @param app
 */

module.exports.init = app => {
  const env = process.env.NODE_ENV || 'development';
  const apiDir = path.join(__dirname, '/');
  const endpoints = [];
  endpoints.push(path.join(__dirname, '/swagger-common.yml'));

  fs.readdirSync(apiDir).forEach(file => {

    endpoints.push(path.join(__dirname, '/' + file));

    if (file.indexOf('.js') !== -1 && file !== 'index.js') {

      try {

        // init all routes
        require(apiDir + '/' + file).init(app);

        app.logger.info(`route ${file} has been initialized`);

      } catch (e) {

        app.logger.error('Routes init error: \r\n', e);

      }

    }

  });

  if (env === 'development') {
    const swagger = require('../modules/swagger');
    swagger(app, '/api/docs/', '/api/swagger.json', endpoints);
    app.logger.info('routes /api/docs/ has been initialized');

  }

  app.get('*', (req, res) => res.notFound('route'));
};
