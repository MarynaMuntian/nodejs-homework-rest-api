const express = require('express')
const { listContacts } = require('../../model')
const router = express.Router()

router.get('/api/contacts', async (req, res, next) => {
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: listContacts()
    }
  })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
