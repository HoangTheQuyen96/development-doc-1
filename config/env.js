require('dotenv').config();

module.exports = {
  httpPort: process.env.ENTRYPOINT_HTTP_PORT,
  pgPrimaryUrl: process.env.POSTGRES_PRIMARY_URL,
};
