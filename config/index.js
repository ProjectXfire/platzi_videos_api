require('dotenv').config()

const config = {
  server: {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS
  },
  database: {
    mongoDB: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      name: process.env.DB_NAME
    }
  }
}

module.exports = config
