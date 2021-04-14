// Express
const express = require('express')
// Helmet
const helmet = require('helmet')

// Imported routes
const moviesRoute = require('./controllers/routes/movies')
const userMoviesRoute = require('./controllers/routes/userMovies')
const authAPIRoute = require('./controllers/routes/auth')

// Imported Middlewares
const { logErrors, errors, wrapErrors } = require('./controllers/middlewares/errorsHandler')
const notFoundPage = require('./controllers/middlewares/notFoundHandler')

// Config
const config = require('./config')
const { port } = config.server

// App
const app = express()

// Parser data
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(helmet())

// Routes
authAPIRoute(app)
moviesRoute(app)
userMoviesRoute(app)

// Catch 404
app.use(notFoundPage)

// Middlewares Errors
app.use(logErrors)
app.use(wrapErrors)
app.use(errors)

// Server
app.listen(port, () => {
  console.log(`Listening in http://localhost:${port}`)
})