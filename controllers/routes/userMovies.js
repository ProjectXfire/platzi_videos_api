const express = require('express')
const passport = require('passport')
const UserMoviesService = require('../../services/userMovies')
const { userMovieIdSchema, createUserMoviesSchema } = require('../../lib/schemas/userMovies')
const { idUserSchema } = require('../../lib/schemas/users')
const validation = require('../middlewares/validationHandlers')
const validationScope = require('../middlewares/validationScopesHandler')

// JWT Strategy
require('../../utils/auth/strategies/jwt')

const UserMoviesApi = (app) => {
  const router = express.Router()
  const userMoviesService = new UserMoviesService()
  app.use('/api/user/movies', passport.authenticate('jwt', { session: false }), router)

  router.get(
    '/',
    validationScope(['read:user-movies']),
    validation({ userId: idUserSchema }, 'query'),
    async (req, res, next) => {
    try {
      const { userId } = req.query
      const userMovies = await userMoviesService.getUserMovies({ userId })
      res.status(200).json({
        data: userMovies,
        message: 'user movies listed'
      })
    } catch (err) {
      next(err)
    }
  })

  router.post(
    '/',
    validationScope(['create:user-movies']),
    validation(createUserMoviesSchema),
    async (req, res, next) => {
    try {
      const userMovie = req.body
      const userMovieId = await userMoviesService.createUserMovies({ userMovie })
      res.status(201).json({
        data: userMovieId,
        message: `user movie created`
      })
    } catch (err) {
      next(err)
    }
  })

  router.delete(
    '/:id',
    validationScope(['delete:user-movies']),
    validation({ id: userMovieIdSchema}, 'params'),
    async (req, res, next) => {
    try {
      const { id } = req.params
      const userMovieId = await userMoviesService.deleteUserMovies({ id })
      res.status(200).json({
        data: userMovieId,
        message: `user movie deleted`
      })
    } catch (err) {
      next(err)
    }
  })
}

module.exports = UserMoviesApi