import fs from "fs/promises";
import path from "path";
import {nanoid} from "nanoid";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { buffer } from "stream/consumers";

const __dirname = dirname(fileURLToPath(import.meta.url));

const contactsPath =  path.join(__dirname, "db/contacts.json");

const listContacts = async()=> {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(element => element.id === contactId);
    return result || null;
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  }
  
  async function addContact(data) {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }
  
  export {
    listContacts, 
    getContactById,
    removeContact,
    addContact
  };