const wildersRouter = require('../routes/Wilders')

const setupRoutes = app => {
  app.use('/api/v1/wilders', wildersRouter)
  app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' })
  })
}

module.exports = { setupRoutes }
