const Joi = require('joi')

const { idMovieSchema } = require('./movie')
const { idUserSchema } = require('./users')

const userMovieIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).label('Invalid ID format')

const createUserMoviesSchema = {
  userId: idUserSchema,
  movieId: idMovieSchema
}

module.exports = {
  userMovieIdSchema,
  createUserMoviesSchema
}