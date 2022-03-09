const wildersRouter = require('./wilders.routes')

const setupRoutes = app => {
  app.use('/api/v1/wilders', wildersRouter)
  app.use((error, req, res, next) => {
    if (!error.status) {
      return res.status(500).json({ message: 'Error server.' })
    }
    return res
      .status(error.status)
      .json({ message: error.message, stack: error.stack })
  })
  app.use((_, res) => {
    return res.status(404).json({ message: 'Route not found' })
  })
}

module.exports = { setupRoutes }
