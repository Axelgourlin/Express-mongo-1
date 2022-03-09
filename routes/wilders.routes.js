const wildersRouter = require('express').Router()
const WilderController = require('../controllers/wilders.controller')

wildersRouter.get('/', WilderController.findAll)
wildersRouter.get('/:id', WilderController.findOneById)
wildersRouter.post('/', WilderController.create)
wildersRouter.put('/:id', WilderController.update)
wildersRouter.patch('/:id', WilderController.updatePartial)
wildersRouter.delete('/:id', WilderController.destroy)

module.exports = wildersRouter
