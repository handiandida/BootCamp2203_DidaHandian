//coneccting to databases
const Pool = require('pg').Pool

const pool = new Pool({
    user:"postgres",
    password:"dizda12345",
    database:"db_contact",
    host:"localhost",
    port:5432
})

module.exports = pool