const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");
const ID = () => {
  return Math.random().toString(36).substr(2, 9);
};
const readData = async () => {
  const result = await fs.readFile(path.join("db", "contacts.json"), "utf8");
  return JSON.parse(result);
};

const listContacts = async () => {
  return readData();
};

const getContactById = async (contactId) => {
  const contacts = await readData();
  const [result] = contacts.filter((contact) => contactId === contact.id);
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await readData();
  const result = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(
    path.join("db", "contacts.json"),
    JSON.stringify(contacts, null, 2),
  );
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await readData();
  const newContact = { id: uniqid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join("db", "contacts.json"),
    JSON.stringify(contacts, null, 2),
  );
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
