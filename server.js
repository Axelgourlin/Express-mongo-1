const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const { default: mongoose } = require('mongoose')
const { setupRoutes } = require('./routes/index')

const app = express()
const PORT = process.env.API_PORT || 4000

const Init = async () => {
  try {
    await mongoose.connect(
      `mongodb://127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      { autoIndex: true }
    )
    console.log('Connected to database !')
  } catch (error) {
    console.log(error)
  }

  app.use(morgan('tiny'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  setupRoutes(app)

  app.listen(PORT, () => {
    console.log('Server is running on port : ' + PORT)
  })
}
Init()
