const WilderModel = require('../models/wilder.model')
const createError = require('http-errors')
const { validateInputWilderDto } = require('../helpers/Joi')

const create = async (req, res) => {
  await WilderModel.init()
  const inputDto = req.body
  let validationError = null
  validationError = validateInputWilderDto(inputDto)
  if (validationError) {
    throw createError(400, 'Body does not have a correct format.')
  }
  const wilder = new WilderModel(inputDto)

  try {
    const result = await wilder.save()
    return res.status(201).json({ success: true, result: result })
  } catch (error) {
    if (error.code === 11000) {
      throw createError(409, `Name '${inputDto.name}' already use.`)
    }
    throw error
  }
}

const findOneById = async (req, res) => {
  const { id } = req.params

  const wilder = await WilderModel.findById(id)
  if (!wilder) {
    throw createError(404, `Wilder with ID '${id}' not found.`)
  } else {
    return res.status(200).json({ success: true, result: wilder })
  }
}

const findAll = async (_, res) => {
  const wilders = await WilderModel.find()
  if (!wilders) {
    throw createError(404, `Wilders not found.`)
  } else {
    return res.status(200).json({ success: true, result: wilders })
  }
}

const updatePartial = async (req, res) => {
  const { id } = req.params
  const inputDto = req.body
  let validationError = null
  validationError = validateInputWilderDto(inputDto, false)
  if (validationError) {
    throw createError(400, 'Body does not have a correct format.')
  }
  try {
    const wilder = await WilderModel.findByIdAndUpdate({ _id: id }, inputDto, {
      new: true
    })
    return res.status(200).json({ success: true, result: wilder })
  } catch (error) {
    if (error.path === '_id') {
      throw createError(404, `Wilder with ID '${id}' not found.`)
    }
    throw error
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const inputDto = req.body
  let validationError = null
  validationError = validateInputWilderDto(inputDto, false)
  if (validationError) {
    throw createError(400, 'Body does not have a correct format.')
  }

  const wilder = await WilderModel.findById(id)
  if (!wilder) {
    throw createError(404, `Wilder with ID '${id}' not found.`)
  } else {
    wilder.name = inputDto.name
    wilder.city = inputDto.city
    wilder.skills = inputDto.skills
    const result = await wilder.save(wilder)
    return res.status(200).json({ success: true, result: result })
  }
}

const destroy = async (req, res) => {
  const { id } = req.params
  try {
    const result = await WilderModel.deleteOne({ _id: id })
    return res.status(200).json({ success: true, result: result })
  } catch (error) {
    if (error.path === '_id') {
      throw createError(404, `Wilder with ID '${id}' not found.`)
    }
    throw error
  }
}

module.exports = {
  create,
  findOneById,
  findAll,
  update,
  updatePartial,
  destroy
}
