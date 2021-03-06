const express = require('express')

//call express library
const app = express()

//call database
const pool = require('./db')
const db = require('./db')

const port = 3000
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const { loadContact, findContact, addContact, duplicateContact, destroyContact, updateContact } = require('./contacts') //untuk memanggil contacts.js 
const { check, validationResult, body, Result } = require('express-validator')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash');
const req = require('express/lib/request')
const { error } = require('console')

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

// app.get('/contact', (req, res) => {
//     const contacts = loadContact()
//     res.render('contact', 
//     { 
//         contact : "Contact List", 
//         title :"Contact Page",
//         // layout : "layout/main"
//         contacts,
//         msg: req.flash('msg')
//         })
// })

app.get('/contact', db.getContacts)



app.get('/contact/add', (req, res) => {
    res.render('add_contact',
    {
        title : "Add Contact Page"
    })
})

app.post('/contact', db.addContacts)
app.get('/contact/:name', db.detailContacts)
app.get('/contact/delete/:name', db.deleteContacts)
app.get('/contact/edit/:name', db.editContacts)
app.post('/contact/update', db.updateContacts)

//form edit process
// app.get('/contact/edit/:name', (req, res) => {
//     const contact = findContact(req.params.name)
//     res.render('edit_contact',
//     {
//         title : "Add Contact Page",
//         contact
//     })
// })




//data contact process
// app.post('/contact',
// [
//     body('name').custom((value) => {
//         const duplicate = duplicateContact(value)
//             if(duplicate) {
//                 throw new Error('Name already in use')
//             } 
//             return true
//         }),
//     check('email','your email is wrong').isEmail(),
//     check('mobile','your mobile phone number is wrong').isMobilePhone('id-ID'),
// ], (req, res) => {
//     const error = validationResult(req)
//     if(!error.isEmpty()) {
//         res.render('add_contact', 
//     {  
//         title : "Add Contact Page",
//         error : error.array()
//     })
//     }else {
//     addContact(req.body)
//     req.flash('msg','data added successfully')
//     res.redirect('/contact')
//     }
    
// })




//update contact process
// app.post('/contact/update',
// [
//     body('name').custom((value, {req}) => {
//         const duplicate = duplicateContact(value)
//             if(value !== req.body.oldname && duplicate) {
//                 throw new Error('Name already in use')
//             } 
//             return true
//         }),
//     check('email','your email is wrong').isEmail(),
//     check('mobile','your mobile phone number is wrong').isMobilePhone('id-ID'),
// ], (req, res) => {
//     const error = validationResult(req)
//     if(!error.isEmpty()) {
//         res.render('edit_contact', 
//     {  
//         title : "Add Contact Page",
//         error : error.array(),
//         contact : req.body
//     })
//     }else {
//     updateContact(req.body)
//     req.flash('msg','data changed successfully')
//     res.redirect('/contact')
//     }
    
// })


//delete contact process
// app.get('/contact/delete/:name', (req, res) => {
//     const contact = findContact(req.params.name)

//     if(!contact){
//         res.status(404)
//         res.send('page not found 404')
//     } else {
//         destroyContact(req.params.name)
//         req.flash('msg','Data has been deleted')
//         res.redirect('/contact')
//     }
// })


//delete contact process using checkbox
// app.post('/deletedContacts', (req, res) => {
//     var {ceklis} = req.body
//     console.log(ceklis)
//     console.log(ceklis.length)
//     if(Array.isArray(ceklis)){
//         ceklis.forEach( contacted => {
//             destroyContact(contacted)
//             req.flash('msg',`${ceklis.length} data has been deleted`)
//             res.redirect('/contact')
//         })
//     } else {
//         destroyContact(ceklis)
//         req.flash('msg',`${ceklis} data has been deleted`)
//         res.redirect('/contact')
//     }
    
    
// })

//contact detail process
// app.get('/contact/:name', (req, res) => {
//     const contact = findContact(req.params.name)
//     res.render('detail', 
//     {  
//         title :"Contact Detail Page",
//         // layout : "layout/main"
//         contact
//     })
// })

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

