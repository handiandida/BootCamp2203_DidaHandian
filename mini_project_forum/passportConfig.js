const LocalStrategy = require('passport-local').Strategy
const { pool } = require('./dbConfig')
const bcrypt = require('bcrypt')
const { password, user } = require('pg/lib/defaults')

function initialize(passport) {
    const autheticateUser = (email, password, done) => {
        pool.query(`SELECT * FROM users WHERE email = $1`, [email],
        (err, results) => {
            if(err){
                throw err
            }
            console.log(results.rows)

            if (results.rows.length > 0) {
                const user = results.rows[0]

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err){
                        throw err
                    }

                    if(isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message : 'Password is not correct'})
                    }
                })
            } else {
                return done(null, false, {message : 'Email is not registered'})
            }
        })
    }

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            autheticateUser
        )
    )

    passport.serializeUser((user, done) => done(null, user.id_user))

    passport.deserializeUser((id_user, done) => {
        pool.query(`SELECT * FROM users WHERE id_user = $1`, [id_user], 
        (err, results) => {
            if (err) {
                throw err
            }
            return done(null, results.rows[0])
        })
    })
}

module.exports = initialize