const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const { default: mongoose } = require('mongoose')
const WilderController = require('./controllers/Wilders')

const app = express()

mongoose
  .connect(
    `mongodb://127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    { autoIndex: true }
  )
  .then(() => console.log('Connected to database !'))
  .catch(err => console.log(err))

const PORT = process.env.API_PORT || 4000

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/wilders', WilderController.findAll)
app.get('/api/wilders/:id', WilderController.findOneById)
app.post('/api/wilders', WilderController.create)
app.put('/api/wilders/:id', WilderController.update)
app.delete('/api/wilders/:id', WilderController.destroy)

app.listen(PORT, () => {
  console.log('Server is running on port : ' + PORT)
})
