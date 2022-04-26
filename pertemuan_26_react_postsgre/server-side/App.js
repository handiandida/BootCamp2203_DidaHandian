const express = require ('express')
const app = express()
const cors = require ('cors')
const pool = require ('./db')

//Middleware
app.use(cors())
app.use(express.json()) //req.body


const port = 3001

// Get All Contact
app.get('/contacts', async(req, res) => {
    try {
        const {rows : allContacts} = await pool.query(`SELECT * FROM latihan ORDER BY name ASC`)
        res.json(allContacts)
    } catch (error) {
        console.error(err.message)
    }
})

// Create Contact
app.post('/contacts', async (req, res) => {
    try {
        console.log(req.body)
        const {name, email, mobile} = req.body
        const {rows : newContacts} = await pool.query(`INSERT INTO Latihan (name, email, mobile) VALUES ('${name}','${email}','${mobile}') RETURNING *`)
        res.json(newContacts)
    } catch (error) {
        console.error(err.message)
    }
})


// Get Contact by ID
app.get('/contacts/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {rows : contact} = await pool.query(`SELECT * FROM latihan WHERE id = $1`, [id])
        res.json(contact)
    } catch (error) {
        console.error(err.message)
    }
})

// Update Contact
app.put('/contacts/:id', async (req, res) => {
    try {
        
        const { updateName, updateEmail, updateMobile } = req.body
        const updateContact = await pool.query(`UPDATE latihan SET name = '${updateName}', email = '${updateEmail}', mobile = '${updateMobile}' WHERE id = '${req.params.id}'`)
        res.json("Contact Berhasil di Update")
    } catch (error) {
        console.error(err.messages)
    }
})

// Delete Contact
app.delete('/contacts/:id', async(req, res) => {
    try {
        const { id } = req.params
        const deleteContact = await pool.query(`DELETE FROM latihan WHERE id = $1`, [id])
        res.json('Contact berhasil di Delete')
    } catch (error) {
        console.error(err.message)
    }
})


app.listen(port, () => {
    console.log (`Server running at http://localhost:${port}/`)
})