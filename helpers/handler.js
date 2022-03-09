const createError = require('http-errors')

function asyncHandler(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

function valideBody(req, _, next) {
  if (Object.keys(req.body).length === 0) {
    throw createError(400, 'Body can not be empty!')
  }
  next()
}

module.exports = { asyncHandler, valideBody }
