const config = require('../../config')
const boom = require('@hapi/boom')
const debug = require('debug')('app:errors')

const errorsStack = (err, stack) => {
  if (config.server.dev) {
    return { ...err, stack }
  }
  return err
}

const logErrors = (err, req, res, next) => {
  debug(err)
  next(err)
}

// Validate if the error is boom type
const wrapErrors = (err, req, res, next) => {
  if (!err.isBoom) { // If not boom type, send a boom type error
    next(boom.badImplementation(err))
  }
  next(err) // Send a boom type error
}

// eslint-disable-next-line no-unused-vars
const errors = (err, req, res, next) => {
  const { output: { statusCode, payload } } = err
  res.status(statusCode)
  res.json(errorsStack(payload, err.stack))
}

module.exports = {
  wrapErrors,
  logErrors,
  errors
}