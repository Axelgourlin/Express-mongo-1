const wildersRouter = require('./wilders.routes')

const setupRoutes = app => {
  app.use('/api/v1/wilders', wildersRouter)
  app.use((err, req, res, next) => {
    return res.status(500).json({ message: 'Error server.' })
  })
  app.use((_, res) => {
    return res.status(404).json({ message: 'Route not found' })
  })
}

module.exports = { setupRoutes }
