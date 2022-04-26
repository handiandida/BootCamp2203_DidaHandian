const Pool = require('pg').Pool

const pool = new Pool({
    user : 'postgres',
    password : 'dizda12345',
    port : 5432,
    database : 'db_contact',
    host : 'localhost'
})

module.exports = pool