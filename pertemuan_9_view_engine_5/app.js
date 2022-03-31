const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const expressLayouts = require('express-ejs-layouts')


//informasi menggunkan ejs
app.set('view engine', 'ejs')

//informasi menggunakan ejs layout
app.use(expressLayouts)
app.set('layout','layout/main')

app.get('/', (req, res) => {
    cont = [
        {
            nama : "Dida",
            email : "dida@gmail.com",
            mobile : "081818182525"
        },
        {
            nama : "Handian",
            email : "handian@gmail.com",
            mobile : "081321123188"
        },
        {
            nama : "Dizda",
            email : "dizda@gmail.com",
            mobile : "0811171117117"
        },
    ]
    res.render('index', 
    { 
        nama : "Hanya Dida yang Tampan", 
        title : "Home Page",
        cont,
    }
    )
})

app.get('/about', (req, res) => {
    res.render('about', 
    { 
        about : "Latihan EJS", 
        title : "About Page",
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', 
    { 
        contact : "Latihan EJS", 
        title :"Contact Page",
    })
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