const { HTTPServer } = require('../src/entrypoints/http/http-server');
const pgPrimary = require('./infrastructures/data-gateway/providers/pgPrimary');

const { httpPort, pgPrimaryUrl } = require('../config/env');

const loadSingleton = async (logger = console) => {
  try {
    HTTPServer(console, httpPort);
    await pgPrimary.connect(pgPrimaryUrl);
    logger.info(`[POSTGRES] connected to ${pgPrimaryUrl}`);
  } catch (error) {
    logger.error(JSON.stringify(error.stack));
    process.exit(1);
  }
};

loadSingleton(console);
