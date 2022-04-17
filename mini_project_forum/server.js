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
const multer = require('multer')
const path = require('path')
const { rows } = require('pg/lib/defaults')

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


const storageImg = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './assets/img')
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage : storageImg})

app.get('/', (req, res) => {
    res.render('index', {
        nama : "Forum App", 
        title : "Home Page"
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

app.get('/users/dashboard', checkNotAuthenticated, async (req, res) => {
    try{    
            const thread = await getThread()
            res.render('dashboard', {     
                title : "Dashboard Page",
                user : req.user.name,
                id : req.user.id_user,
                thread
            })
    } catch (err){
        console.error(err.message)
    }
})


app.get('/users/profile/:id_user', checkNotAuthenticated, async (req, res) => {
    try {
            // const users = await getUsers()
            res.render('profile', {     
                title : "Profile Page",
                user : req.user.name,
                email : req.user.email,
                id : req.user.id_user,
                img : req.user.img,
                // users
            })
            
    } catch (err){
        console.error(err.message)
    }
})

app.post('/upload', checkNotAuthenticated, upload.single('img'), async (req, res) => {
    const { name, img} = req.body
    await pool.query(`UPDATE users SET name='${name}', img='${img}' WHERE id_user='3'`)
    res.redirect('/users/profile/:id_user')
})


app.get('/users/add-thread', checkNotAuthenticated, async (req, res) => {
    try {
            const main = await getMain()
            const subs = await getSub()
            res.render('add_thread', { 
                title : "Add Thread Page",
                user : req.user.name,
                id : req.user.id_user,
                main,
                subs
        })
    }
    catch(err){
        console.error(err.message)
    }
})

app.post('/users/add-thread', async (req, res) => {
    try {
        const { body_thread, date_thread, title_thread, id_main, id_sub, id_user } = req.body
        const { rows : addThread } = await pool.query(`insert into discussion (body_thread, date_thread, title_thread, id_main, id_sub, id_user) values ('${body_thread}','${date_thread}','${title_thread}','2','3','3')`)
        console.log(addThread)
    } catch (err){
        console.error(err.message)
    }
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


async function getMain (req, res) {
    try{
        const {rows : listMain} = await pool.query(`SELECT * FROM main_forum`)
        return listMain
    } catch (err) {
        console.log(err.message)
    }
}

async function getSub (req, res) {
    try{
        const {rows : listSub} = await pool.query(`SELECT * FROM sub_forum`)
        return listSub
    } catch (err) {
        console.log(err.message)
    }
}

async function getThread (req, res) {
    try{
        const {rows : listThread} = await pool.query(`SELECT * FROM discussion`)
        return listThread
    } catch (err) {
        console.log(err.message)
    }
}

async function getUsers (req, res) {
    try{
        const {rows : listUsers} = await pool.query(`SELECT * FROM users`)
        return listUsers
    } catch (err) {
        console.log(err.message)
    }
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})