const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const handleRouteNotFound = require('./middlewares/handle-route-notfound');
const handleUnexpected = require('./middlewares/handle-unexpected');
const handleUnsupportedMediaType = require('./middlewares/handle-unsupported-media-type');
const router = require('./app/router');

module.exports.HTTPServer = (logger = console, port) => {
  const app = express();
  app.use(helmet());

  app.use(cors());

  app.use(
    bodyParser.urlencoded({
      limit: '1mb',
      extended: true,
    })
  );

  app.use(bodyParser.json());

  app.use(handleUnexpected);

  app.use(handleUnsupportedMediaType);

  app.use(router);

  app.use(handleRouteNotFound);

  app.on('error', errors => {
    logger.error(errors);
  });

  app.listen(port || 8000, error => {
    if (error) {
      logger.error(error);
      process.exit(1);
    } else {
      logger.info(`${'[MAIN]'} Server is listening on port ${port || 8000}`);
    }
  });
};
