const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const { loadContact, findContact, addContact, duplicateContact, destroyContact, updateContact } = require('./contacts') //untuk memanggil contacts.js 
const { check, validationResult, body } = require('express-validator')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash');
const req = require('express/lib/request')

//call database
const pool = require("./db")


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
        res.render('index', {
            nama : 'Hanya Dida yang Tampan',
            title : 'Home Page',
        })
})


app.get('/about', (req, res) => {
        res.render('about', { 
            title : "About Page"
        })
})


app.get('/contact', async (req, res) => {
    try {
        const {rows : contacts} = await pool.query(`SELECT * FROM contacts ORDER BY name ASC`)
        res.render('contact', {
            title : 'Home Page',
            contacts,
            msg : req.flash('msg')
        })
    }
    catch (err) {
        console.error(err.message)
    }
})


app.get('/contact/add', (req, res) => {
    res.render('add_contact', 
    {
        title : "Add Contact Page"
    })
})


app.post('/contact', [
    body('name').custom(async(value) => {
        const contact = await pool.query(`SELECT name FROM contacts where name = '${value}'`)
        if(contact.rowCount > 0) {
            throw new Error('Name already in use')
        }
        return true
    }),
    check('email','your email is wrong').isEmail(),
    check('mobile', 'your mobile phone number is wrong').isMobilePhone('id-ID')
    
], 
    (req, res) => {
        try{
            const error = validationResult(req)
            if (!error.isEmpty()) {
                res.render('add_contact', {
                    title : "Add Contact Page",
                    error : error.array(),
                })
                req.flash('msg', 'data is not added successfully')
                res.redirect('/contact')
            }
            else {
                const {name, email, mobile} = req.body
                pool.query(`INSERT INTO contacts VALUES ('${name}','${mobile}','${email}')`)
                req.flash('msg','data added successfully')
                res.redirect('/contact')
            }
    }
    catch(err) {
        console.error(err.message)
    }
})


app.post('/contact/update', [
    body('name').custom(async(value, {req}) => {
        const duplicate = await pool.query(`SELECT name FROM contacts WHERE name = '${value}'`)
        if(!value === req.body.oldname && duplicate) {
            throw new Error('Name already in use')
        }
        return true
    }),
    check('email', 'your email is wrong').isEmail(),
    check('mobile', 'your mobile phone number is wrong').isMobilePhone('id-ID')
    
], 
    async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.render('edit_contact', {
            title : "Add Contact Page",
            error : error.array(),
            contact : req.body
        })
    }
    else {
        const{name, email, mobile} = req.body
        await pool.query(`UPDATE contacts SET name = '${name}', mobile = '${mobile}', email = '${email}' where name = '${req.body.oldname}' `)
        req.flash('msg','data changed successfully')
        res.redirect('/contact')
    }
})

app.get('/contact/delete/:name', async (req, res) => {
    try {
        const deletecontact = await pool.query(`DELETE FROM contacts WHERE name = '${req.params.name}'`)
        if(!deletecontact) {
            res.status(404)
            res.send('page not found 404')
        }
        else {
            req.flash('msg', 'Data has been deleted')
            res.redirect('/contact')
        }
    }
    catch(err){
        console.error(err.message)
    }
})


app.get('/contact/edit/:name', async (req, res) => {
    try{
        const {rows : editcontact} = await pool.query(`SELECT name, email, mobile FROM contacts WHERE name = '${req.params.name}'`)
        editcontact.map(contact => {
            res.render('edit_contact', {
                title : "Edit Contact Page",
                contact
            })
        })
    }
    catch (err) {
        console.error(err.message)
    }
    
})

app.get('/contact/:name', async (req, res) => {
    try{
        const {rows : detailcontact} = await pool.query(`SELECT * FROM contacts where name = '${req.params.name}'`)
        detailcontact.map(contact => {
            res.render('detail', {
                title :"Contact Detail Page",
                contact
            })
        })
    }
    catch (err) {
        console.error(err.message)
    }
    
})




app.use('/', (req, res) => {
    res.sendStatus(404)
})

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}/`)
})