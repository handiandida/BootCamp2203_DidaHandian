//coneccting to databases
const Pool = require('pg').Pool

const pool = new Pool({
    user:"postgres",
    password:"dizda12345",
    database:"db_contact",
    host:"localhost",
    port:5432
})

//fungsi menampilkan data
const getContacts =  async (req, res) => {
    try{
        const sql = await pool.query(`SELECT * FROM contacts ORDER BY name ASC `)
        res.render('contact', {
            title : 'test db',
            kontak : sql.rows,
            msg: req.flash('msg')
        })
    } catch (err) {
        console.error(err.message)
    }
}

//fungsi detail data
const detailContacts =  async (req, res) => {
    try{
        const {rows : detailsql} = await pool.query(`SELECT * FROM contacts where name='${req.params.name}'`)
        detailsql.map(
            kontaks => 
        res.render('detail', {
            title : 'test detail db',
            kontaks,
            msg: req.flash('msg')
        })
        )} catch (err) {
        console.error(err.message)
    }
}

//fungsi menambah data
const addContacts =  async (req, res) => {
    try{
        const {name, email, mobile} = req.body
        const addsql = await pool.query(`INSERT INTO contacts VALUES
        ('${name}','${mobile}','${email}') RETURNING * `)
        res.render('contact', {
            title : 'test add db',
            msg: req.flash('msg')
        })
        res.redirect('/contact')
    } catch (err) {
        console.error(err.message)
    }
}

//funsgi menghapus data
const deleteContacts =  async (req, res) => {
    try{
        const deletesql = await pool.query(`DELETE FROM contacts where name='${req.params.name}'`)
        res.render('contact', {
            title : 'test delete db',
            msg: req.flash('msg')
        })
        res.redirect('/contact')
    } catch (err) {
        console.error(err.message)
    }
}

//fungsi update data
const updateContacts =  async (req, res) => {
    try{
        const {name, email, mobile, oldname} = req.body
        await pool.query(`UPDATE contacts set name='${name}', mobile='${mobile}', email='${email}'
        where name='${oldname}'`)
        res.render('contact', {
            title : 'test add db',
            msg: req.flash('msg')
        })
        res.redirect('/contact')
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = {
    getContacts,
    detailContacts,
    addContacts,
    deleteContacts,
    updateContacts
}