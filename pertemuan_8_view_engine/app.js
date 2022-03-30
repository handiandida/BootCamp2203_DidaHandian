const express = require('express')
const app = express()
const port = 3000
const path = require('path')


//informasi menggunkan ejs
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { nama : "Hanya Dida yang Tampan"})
})

app.get('/about', (req, res) => {
    res.render('about', { about : "Latihan EJS"})
})

app.get('/contact', (req, res) => {
    res.render('contact', { contact : "Latihan EJS"})
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