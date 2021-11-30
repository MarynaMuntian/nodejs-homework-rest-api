const fs = require('fs/promises')
const path = require("path");
const { v4 } = require("uuid");
// const contacts = require('./contacts.json');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const result = contacts.find(contact => contact.id === parseInt(contactId))
  if (!result) {
    return null
  }
  return result
}

const removeContact = async (contactId) => {}

// const addContact = async (body) => { }

const addContact = async(name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };

// if (!name || !email || !phone) {
//   return `All fields are required!`
// }

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (contactId, body) => {
const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === parseInt(contactId));
    if(idx === -1){
        return null;
    }
    contacts[idx] = {...body, contactId};
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
