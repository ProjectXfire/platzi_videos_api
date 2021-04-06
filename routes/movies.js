const express = require('express')
const { moviesMock } = require('../store/mocks/movies')

const moviesApi = (app) => {
  const router = express.Router()
  app.use('/api/movies', router)

  router.get('/', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock)
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch (err) {
      next(err)
    }
  })
  router.get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const movie = await Promise.resolve(moviesMock[0])
      res.status(200).json({
        data: movie,
        message: 'movie retrieved'
      })
    } catch (err) {
      next(err)
    }
  })
  router.post('/', async (req, res, next) => {
    try {
      const movie = req.body
      const movieId = await Promise.resolve(moviesMock[0].id)
      res.status(201).json({
        data: movieId,
        message: `movie created`
      })
    } catch (err) {
      next(err)
    }
  })
  router.put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const movieId = await Promise.resolve(moviesMock[0].id)
      res.status(200).json({
        data: movieId,
        message: `movie updated`
      })
    } catch (err) {
      next(err)
    }
  })
  router.delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const movieId = await Promise.resolve(moviesMock[0].id)
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