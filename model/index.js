const fs = require('fs/promises')
const contacts = require('./contacts.json');

const listContacts = async () => {
  const data = await fs.readFile('./model/contacts.json')
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
