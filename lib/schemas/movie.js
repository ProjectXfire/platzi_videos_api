const Joi = require('joi')

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).label('Invalid ID format')

const createSchemaMovie = {
  title: Joi.string().max(80).required(),
  year: Joi.number().min(1888).max(2077).required(),
  cover: Joi.string().required(),
  description: Joi.string().max(300).required(),
  duration: Joi.number().min(1).max(300).required(),
  contentRating: Joi.string().max(5).required(),
  source: Joi.string().uri().required(),
  tags: Joi.array().items(Joi.string().max(50))
}

const updateSchemaMovie = {
  title: Joi.string().max(80),
  year: Joi.number().min(1888).max(2077),
  cover: Joi.string(),
  description: Joi.string().max(300),
  duration: Joi.number().min(1).max(300),
  contentRating: Joi.string().max(5),
  source: Joi.string().uri(),
  tags: Joi.array().items(Joi.string().max(50))
}

module.exports = {
  idSchema,
  createSchemaMovie,
  updateSchemaMovie
}