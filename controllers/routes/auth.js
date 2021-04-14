const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const ApiKeysService = require('../../services/apiKeys')
const UsersService = require('../../services/users')
const validation = require('../middlewares/validationHandlers')
const { createSchemaUser, createSchemaProviderUser } = require('../../lib/schemas/users')
const config = require('../../config')

// Basic strategy
require('../../utils/auth/strategies/basic')

const authApi = (app) => {
  const router = express.Router()
  const apiKeysService = new ApiKeysService()
  const usersService = new UsersService()
  app.use('/api/auth', router)

  // Sign in
  router.post('/sign-in', async (req, res, next) => {
    const { apiKeyToken } = req.body
    if (!apiKeyToken) {
      next(boom.unauthorized('API token is required'))
    }
    passport.authenticate('basic', (err, user) => {
      try {
        if (err || !user) {
          next(boom.unauthorized())
        }
        req.login(user, { session: false }, async (err) => {
          if (err) {
            next(err)
          }
          const [apiKey] = await apiKeysService.getApiKey({ token: apiKeyToken })
          if (!apiKey) {
            next(boom.unauthorized())
          }
          const { _id: id, name, email } = user
          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes
          }
          const token = jwt.sign(payload, config.auth.jwt_secret, { expiresIn: '15m' })
          return res.status(200).json({
            token,
            user: {
              id, name, email
            }
          })
        })
      } catch (err) {
        next(err)
      }
    })(req, res, next)
  })

  // Sign up
  router.post('/sign-up', validation(createSchemaUser), async (req, res, next) => {
    const user = req.body
    try {
      const [alreadyExist] = await usersService.getUser({ email: user.email })
      if (alreadyExist) {
        res.status(200).json({
          message: `${alreadyExist.email} is already registered, please insert a new one`
        })
      } else {
        const userId = await usersService.createUser({ user })
        res.status(201).json({
          data: userId,
          message: 'user created'
        })
      }
    } catch (err) {
      next(err)
    }
  })

  // Sign in OAuth
  router.post('/sign-provider', validation(createSchemaProviderUser), async (req, res, next) => {
    const user  = req.body
    const { apiKeyToken } = user
    if (!apiKeyToken) {
      next(boom.unauthorized('API token is required'))
    } else {
      try {
        const querieUser = await usersService.getOrCreateUser({ user })
        const [apiKey] = await apiKeysService.getApiKey({ token: apiKeyToken })
        if (!apiKey) {
          next(boom.unauthorized())
        } else {
          const { _id: id, name, email } = querieUser
          const payload = {
            id,
            name,
            email,
            scopes: apiKey.scopes
          }
          const token = jwt.sign(payload, config.auth.jwt_secret, { expiresIn: '15m' })
          return res.status(200).json({
            token,
            user: {
              id, name, email
            }
          })
        }
      } catch (err) {
        next(err)
      }
    }
  })
}

module.exports = authApi