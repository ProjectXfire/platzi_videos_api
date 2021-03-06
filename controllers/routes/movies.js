const express = require('express')
const passport = require('passport')
const MoviesService = require('../../services/movies')
const {
  idMovieSchema,
  createSchemaMovie,
  updateSchemaMovie
} = require('../../lib/schemas/movie')
const validation = require('../middlewares/validationHandlers')
const validationScope = require('../middlewares/validationScopesHandler')
const cacheResponse = require('../../utils/cache/response')
const { FIVE_MINUTES } = require('../../utils/cache/times')

// JWT Strategy
require('../../utils/auth/strategies/jwt')

const moviesApi = (app) => {
  const router = express.Router()
  const moviesService = new MoviesService()
  app.use('/api/movies', passport.authenticate('jwt', { session: false }), router)

  router.get(
    '/',
    validationScope(['read:movies']),
    async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES)
    const { tags } = req.query
    try {
      const movies = await moviesService.getMovies({ tags })
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch (err) {
      next(err)
    }
  })

  router.get(
    '/:id',
    validationScope(['read:movies']),
    validation({id: idMovieSchema}, 'params'),
    async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES)
    try {
      const id = req.params.id
      const movie = await moviesService.getMovie({ id })
      res.status(200).json({
        data: movie,
        message: 'movie retrieved'
      })
    } catch (err) {
      next(err)
    }
  })

  router.post(
    '/',
    validationScope(['create:movies']),
    validation(createSchemaMovie),
    async (req, res, next) => {
    try {
      const movie = req.body
      const movieId = await moviesService.createMovie({ movie })
      res.status(201).json({
        data: movieId,
        message: `movie created`
      })
    } catch (err) {
      next(err)
    }
  })

  router.put(
    '/:id',
    validationScope(['update:movies']),
    validation({id: idMovieSchema}, 'params'),
    validation(updateSchemaMovie),
    async (req, res, next) => {
    try {
      const id = req.params.id
      const data = req.body
      const movieId = await moviesService.updateMovie({ id, data })
      res.status(200).json({
        data: movieId,
        message: `movie updated`
      })
    } catch (err) {
      next(err)
    }
  })

  router.patch(
    '/:id',
    async (req, res, next) => {
    try {
      const id = req.params.id
      const data = req.body
      const movieId = await moviesService.updateMovie({ id, data })
      res.status(200).json({
        data: movieId,
        message: `movie updated`
      })
    } catch (err) {
      next(err)
    }
  })

  router.delete(
    '/:id',
    validationScope(['delete:movies']),
    validation({id: idMovieSchema}, 'params'),
    async (req, res, next) => {
    try {
      const id = req.params.id
      const movieId = await moviesService.deleteMovie({ id })
      res.status(200).json({
        data: movieId,
        message: `movie deleted`
      })
    } catch (err) {
      next(err)
    }
  })
}

module.exports = moviesApi