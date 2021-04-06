require('dotenv').config()

const config = {
  server: {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000
  }
}

module.exports = config
