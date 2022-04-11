//call express module
const express = require('express')

//call express library
const app = express()

//call database
const pool = require("./db")

app.use(express.json()) // => req.body
const port = 3000

//insert data to database
app.get("/addasync", async (req, res) => {
    try {
        const name = "handian"
        const mobile = "081414141414"
        const email = "handian@gmail.com"
        const newCont = await pool.query(`INSERT INTO contacts VALUES
        ('${name}','${mobile}','${email}') RETURNING * `)
        res.json(newCont)
    } catch (err) {
        console.log(arr.message)
    }
})

app.get("/list", async (req, res) => {
    try{
        const listCont = await pool.query(`SELECT name, mobile FROM contacts`)
    res.json(listCont.rows)
    } catch (err) {
        console.log(arr.message)
    }
})

app.get("/list/:name", async (req, res) => {
    try{
        const listCont = await pool.query(`SELECT * FROM contacts where name='${req.params.name}'`)
    res.json(listCont.rows)
    } catch (err) {
        console.log(arr.message)
    }
})

//call server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})