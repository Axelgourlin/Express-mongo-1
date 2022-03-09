const Joi = require('joi')

const validateInputWilderDto = (inputDto, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
    name: Joi.string().alphanum().min(2).max(254).presence(presence),
    city: Joi.string().alphanum().min(2).max(254).presence(presence),
    skills: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().min(1).max(254),
          votes: Joi.number().min(0).max(10)
        })
      )
      .presence(presence)
  }).validate(inputDto, { abortEarly: false }).error
}

module.exports = { validateInputWilderDto }
