const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const req = require('express/lib/request')
const port = process.env.port || 3000
const { pool } = require('./dbConfig')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const initializePassport = require('./passportConfig')

initializePassport(passport)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : false }))

app.use(
    session({
        secret: 'secret',

        resave: false,

        saveUninitialized: false
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(expressLayouts)
app.set('layout', './layout/main')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        nama : "Forum App", 
        title : "Home"
    })
})

app.get('/users/login', checkAuthenticated, (req, res) => {
    res.render('login', { 
        title : "Login Page"
    })
})

app.get('/users/register', checkAuthenticated, (req, res) => {
    res.render('register', { 
        title : "Register Page"
    })
})

app.get('/users/dashboard', checkNotAuthenticated, (req, res) => {
    res.render('dashboard', { 
        title : "Dashboard Page",
        user : req.user.name
    })
})

app.get('/users/logout', (req, res) => {
    req.logOut()
    req.flash('success_msg', 'You have logged out')
    res.redirect('/users/login')
})

app.post('/users/register', async (req, res) => {
    const { name, email, password, password2 } = req.body

    console.log({name, email, password, password2})

    const errors = []

    if (!name || !email || !password || !password2) {
        errors.push({ message : 'Please enter all fields'})
    }

    if (password.length < 8 ) {
        errors.push({ message : 'Password should be at least 8 characters'})
    }

    if (password != password2 ) {
        errors.push({ message : 'Password do not match'})
    }

    if (errors.length > 0) {
        res.render('register', { 
            errors,
            title : 'Register Page'
        })
    }else{
        //form validation sudah berhasil
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)

        pool.query(`SELECT * FROM users WHERE email = $1`, [email],
        (err, results) => {
            if(err) {
                throw err
            }
            console.log(results.rows)

            if(results.rows.length > 0){
                errors.push({message : 'Email already registered'})
                res.render('register', { 
                    errors,
                    title : 'Register Page'
                })
            } else {
                pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id_user, password`,[name, email, hashedPassword], 
                (err, results) => {
                    if(err){
                        throw err
                    }
                    console.log(results.rows)
                    req.flash('success_msg', 'You are now registered. Please log in')
                    res.redirect('/users/login')
                })
            }
        })
    }
})

app.post('/users/login', 
passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
})
)

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/dashboard')
    }
    next()
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/users/login')
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})