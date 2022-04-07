const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const { loadContact, findContact, addContact, duplicateContact, destroyContact } = require('./contacts') //untuk memanggil contacts.js 
const { check, validationResult, body } = require('express-validator')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash');

//informasi menggunakan morgan
app.use(morgan('dev')) //disimpan paling atas karena codingan bersifat sequentials

//informasi menggunkan ejs
app.set('view engine', 'ejs')

//informasi menggunakan ejs layout
app.use(expressLayouts)
app.set('layout','layout/main') //bisa mmenggunakan cara ini atau bisa di panggil di setiap render

app.use(express.urlencoded({extended:true}))

app.use(cookieParser('secret'))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 }
  }))

app.use(flash())


//informasi menggunakan file public
app.use(express.static('public'))

//application-level-middleware
app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.get('/', (req, res) => {
    const contacts = loadContact()
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
        contacts,
        msg: req.flash('msg')
        })
})

app.get('/contact/add', (req, res) => {
    res.render('add_contact',
    {
        title : "Add Contact Page"
    })
})

//data contact process
app.post('/contact',
[
    body('name').custom((value) => {
        const duplicate = duplicateContact(value)
            if(duplicate) {
                throw new Error('Name already in use')
            } 
            return true
        }),
    check('email','your email is wrong').isEmail(),
    check('mobile','your mobile phone number is wrong').isMobilePhone('id-ID'),
], (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        res.render('add_contact', 
    {  
        title : "Add Contact Page",
        error : error.array()
    })
    }else {
    addContact(req.body)
    req.flash('msg','data added successfully')
    res.redirect('/contact')
    }
    
})

app.get('/contact/delete/:name', (req, res) => {
    const contact = findContact(req.params.name)

    if(!contact){
        res.status(404)
        res.send('page not found 404')
    } else {
        destroyContact(req.params.name)
        req.flash('msg','Data has been deleted')
        res.redirect('/contact')
    }
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

