const wildersRouter = require('express').Router()
const WilderController = require('../controllers/wilders.controller')
const { asyncHandler, valideBody } = require('../helpers/handler')

wildersRouter.get('/', asyncHandler(WilderController.findAll))
wildersRouter.get('/:id', asyncHandler(WilderController.findOneById))
wildersRouter.post('/', valideBody, asyncHandler(WilderController.create))
wildersRouter.put('/:id', valideBody, asyncHandler(WilderController.update))
wildersRouter.patch(
  '/:id',
  valideBody,
  asyncHandler(WilderController.updatePartial)
)
wildersRouter.delete('/:id', asyncHandler(WilderController.destroy))

module.exports = wildersRouter
