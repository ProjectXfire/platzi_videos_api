const express = require('express')
const config = require('./config')
const moviesRoute = require('./controllers/routes/movies')
const { logErrors, errors, wrapErrors } = require('./controllers/middlewares/errorsHandler')
const notFoundPage = require('./controllers/middlewares/notFoundHandler')
const { port } = config.server
const debug = require('debug')('app:server')

// App
const app = express()

// Parser data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
moviesRoute(app)
// Catch 404
app.use(notFoundPage)

// Middlewares Errors
app.use(logErrors)
app.use(wrapErrors)
app.use(errors)

// Server
app.listen(port, () => {
  debug(`Listening in http://localhost:${port}`)
})