const boom = require('@hapi/boom')
const Joi = require('joi')

const validate = (data, schema) => {
  const { error } = Joi.object(schema).validate(data)
  return error
}

const validation = (schema, check = 'body') => {
  return function (req, res, next) {
    const err = validate(req[check], schema)
    err ? next(boom.badRequest(err)) : next()
  }
}

module.exports = validation