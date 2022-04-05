const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const { loadContact, findContact } = require('./contacts') //untuk memanggil contacts.js 


//informasi menggunakan morgan
app.use(morgan('dev')) //disimpan paling atas karena codingan bersifat sequentials

//informasi menggunkan ejs
app.set('view engine', 'ejs')

//informasi menggunakan ejs layout
app.use(expressLayouts)
app.set('layout','layout/main') //bisa mmenggunakan cara ini atau bisa di panggil di setiap render


//informasi menggunakan file public
app.use(express.static('public'))

//application-level-middleware
app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.get('/', (req, res) => {
    const contacts = loadContact()
    // cont = [
    //     {
    //         nama : "Dida",
    //         email : "dida@gmail.com",
    //         mobile : "081818182525"
    //     },
    //     {
    //         nama : "Handian",
    //         email : "handian@gmail.com",
    //         mobile : "081321123188"
    //     },
    //     {
    //         nama : "Dizda",
    //         email : "dizda@gmail.com",
    //         mobile : "0811171117117"
    //     },
    // ]
    res.render('index', 
    { 
        nama : "Hanya Dida yang Tampan", 
        title : "Home Page",
        // cont,
        contacts,
        // layout : "layout/main"
    }
    )
})

app.get('/about', (req, res) => {
    res.render('about', 
    { 
        about : "Latihan EJS", 
        title : "About Page",
        // layout : "layout/main"
    })
})

app.get('/contact', (req, res) => {
    const contacts = loadContact()
    res.render('contact', 
    { 
        contact : "Contact List", 
        title :"Contact Page",
        // layout : "layout/main"
        contacts
        })
})


app.get('/contact/:name', (req, res) => {
    const contact = findContact(req.params.name)
    res.render('detail', 
    {  
        title :"Contact Detail Page",
        // layout : "layout/main"
        contact
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

