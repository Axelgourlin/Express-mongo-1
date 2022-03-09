const wildersRouter = require('express').Router()
const WilderController = require('../controllers/wilders.controller')
const { asyncHandler } = require('../helpers/handler')

wildersRouter.get('/', asyncHandler(WilderController.findAll))
wildersRouter.get('/:id', asyncHandler(WilderController.findOneById))
wildersRouter.post('/', asyncHandler(WilderController.create))
wildersRouter.put('/:id', asyncHandler(WilderController.update))
wildersRouter.patch('/:id', asyncHandler(WilderController.updatePartial))
wildersRouter.delete('/:id', asyncHandler(WilderController.destroy))

module.exports = wildersRouter
