const express = require('express')
const contactsOperations = require('../../model/index')
const router = express.Router()
const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required()
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts
    }
  })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.getContactById(id)
    if (!result) {
      const error = new Error("Not found")
      error.status = 404
      throw error
      // res.status(404).json({
      // status: "error",
      // code: 404,
      // message: "Not found"
      // })
      // return
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
     })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      error.status = 400;
      error.message = 'missing required field'
      throw error
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
