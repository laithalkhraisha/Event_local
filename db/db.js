
const { Pool} = require( 'pg');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'Event_websites ',
  password: '963214785Aal@',
  port: 5432,
});
module.exports = pool;
