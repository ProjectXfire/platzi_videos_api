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
  },
  user: {
    admin_pass: process.env.DEFAULT_ADMIN_PASSWORD,
    user_pass: process.env.DEFAULT_USER_PASSWORD
  },
  auth: {
    jwt_secret: process.env.AUTH_JWT_SECRET
  },
  api: {
    public_token: process.env.PUBLIC_API_KEY_TOKEN,
    admin_token: process.env.ADMIN_API_KEY_TOKEN
  }
}

module.exports = config
