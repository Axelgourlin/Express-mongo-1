const WilderModel = require('../models/wilder.model')

const create = async (req, res, next) => {
  await WilderModel.init()
  const wilder = new WilderModel(req.body)

  try {
    const result = await wilder.save()
    return res.status(201).json({ success: true, result: result })
  } catch (error) {
    console.log(error.code)
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, result: 'Name already use.' })
    }
    next(error)
  }
}

const findOneById = async (req, res, next) => {
  const { id } = req.params
  try {
    const wilder = await WilderModel.findById(id)
    if (!wilder) {
      return res
        .status(404)
        .json({ success: false, result: `Wilder with ID: ${id} not found.` })
    } else {
      return res.status(200).json({ success: true, result: wilder })
    }
  } catch (error) {
    next(error)
  }
}

const findAll = async (_, res, next) => {
  try {
    throw new Error()
    const wilders = await WilderModel.find()
    if (!wilders) {
      return res
        .status(404)
        .json({ success: false, result: 'resources not found.' })
    } else {
      return res.status(200).json({ success: true, result: wilders })
    }
  } catch (error) {
    next(error)
  }
}

const updatePartial = async (req, res, next) => {
  const { id } = req.params
  try {
    const wilder = await WilderModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true
    })
    return res.status(200).json({ success: true, result: wilder })
  } catch (error) {
    if (error.path === '_id') {
      return res
        .status(404)
        .json({ success: false, result: `Wilder with ID: ${id} not found.` })
    }
    next(error)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { name, city, skills } = req.body
  try {
    const wilder = await WilderModel.findById(id)
    if (!wilder) {
      return res
        .status(404)
        .json({ success: false, result: `Wilder with ID: ${id} not found.` })
    } else {
      wilder.name = name
      wilder.city = city
      wilder.skills = skills
      const result = await wilder.save(wilder)
      return res.status(200).json({ success: true, result: result })
    }
  } catch (error) {
    next(error)
  }
}

const destroy = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await WilderModel.remove({ _id: id })
    if (!result) {
      return res
        .status(404)
        .json({ success: false, result: `Wilder with ID: ${id} not found.` })
    } else {
      return res.status(200).json({ success: true, result: result })
    }
  } catch (error) {
    next(error)
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
