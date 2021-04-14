const Joi = require('joi')

const idUserSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).label('Invalid ID format')

const createSchemaUser = {
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean()
}

const createSchemaProviderUser = {
  ...createSchemaUser,
  apiKeyToken: Joi.string().required()
}

module.exports = {
  idUserSchema,
  createSchemaUser,
  createSchemaProviderUser
}
