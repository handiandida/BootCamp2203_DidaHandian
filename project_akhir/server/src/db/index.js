const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'forum_app',
  password: 'dizda12345',
  port: 5432,
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}