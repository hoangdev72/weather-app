const bcrypt = require('bcryptjs')
const User = require('../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: 'Incorrect username or password.',
            })
          } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err

              if (isMatch) {
                return done(null, user)
              } else {
                return done(null, false, { message: 'Wrong password' })
              }
            })
          }
        })
        .catch((err) => {
          return done(null, false, { message: err })
        })
    }
  )
)

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (user) {
            return done(null, false, {
              message: 'Email present',
            })
          } else {
            const newUser = new User({ email, password })

            newUser
              .save()
              .then((user) => {
                return done(null, user)
              })
              .catch((err) => {
                return done(null, false, { message: err })
              })
          }
        })
        .catch((err) => {
          console.log(err)
          return done(null, false, { message: err })
        })
    }
  )
)
module.exports = passport
