const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const result = contacts.find(contact => String(contact.id) === String(contactId))
  if (!result) {
    return null
  }
  return result
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(contact => String(contact.id) === String(contactId))
  if (idx === -1) {
    return null
  }
  const [removeContact] = contacts.splice(idx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return removeContact
}

const addContact = async(body) => {
  const contacts = await listContacts()
  const { name, email, phone } = body
  const newContact = { id: v4(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(contact => String(contact.id) === String(contactId))
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...body, contactId }
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
