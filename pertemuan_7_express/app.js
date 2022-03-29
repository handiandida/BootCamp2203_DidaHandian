const express = require('express')
const app = express()
const port = 3000
const path = require('path')



app.get('/', (req, res) => {
    //cara 1 yang langsung bisa ngedirect
    // res.sendFile('./index.html', {root: __dirname})

    //cara 2 yang ahrus panggil module path terlebih dahaulu
    res.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname+'/about.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname+'/contact.html'))
})

app.get('/product/:id', (req, res) => {
    res.send('product id : '+ req.params.id +'<br></br>' + 'category id : ' + req.query.category)
})


app.use('/', (req, res) => {
    res.status(404)
    res.send('page not found 404')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})