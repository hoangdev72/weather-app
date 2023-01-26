const path = require('path')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const createError = require('http-errors')
const logger = require('morgan')
const dotenv = require('dotenv')
const passport = require('passport')

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' })

/**
 * Controllers (route handlers).
 */
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

/**
 * API keys and Passport configuration.
 */

/**
 * Create Express server.
 */
const app = express()

/**
 * Connect to MongoDB.
 */
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URI)
console.log(process.env.MONGODB_URI)
mongoose.connection.on('error', (err) => {
  console.error(err)
  console.log(
    '%s MongoDB connection error. Please make sure MongoDB is running.'
  )
  process.exit()
})

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0')
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  '/css',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))
)
app.use(
  '/js',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))
)
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use(compression())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/**
 * Primary app routes.
 */
app.use('/', indexRouter)
app.use('/users', usersRouter)

/**
 * Error Handler.
 */
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    `App is running on http://localhost:${app.get('port')} in ${app.get(
      'env'
    )} mode`
  )
  console.log('Press CTRL-C to stop')
})

module.exports = app
