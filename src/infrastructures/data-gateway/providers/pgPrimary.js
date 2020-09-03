const { Pool } = require('pg');

let pool;

const connect = async pgUrl => {
  pool = new Pool({
    connectionString: pgUrl,
  });
  await pool.query('SELECT NOW()');
  return;
};

module.exports = {
  query: query => pool.query(query),
  client: () => pool.connect(),
  connect,
};
