const express = require('express')
const config = require('./config')
const moviesRoute = require('./routes/movies')
const { port } = config.server

// App
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
moviesRoute(app)

// Server
app.listen(port, () => {
  console.log(`Listening in http://localhost:${port}`)
})
