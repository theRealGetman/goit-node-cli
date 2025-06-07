import fs from "fs/promises";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

export const readContactsFile = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    return [];
  }
};

export async function listContacts() {
  try {
    const contacts = await readContactsFile();
    return contacts;
  } catch (error) {
    console.error("Error listing contacts:", error);
    return [];
  }
}

export async function getContactById(contactId) {
  const contacts = await readContactsFile();
  const contact = contacts.find((c) => c.id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  try {
    const contacts = await readContactsFile();
    const index = contacts.findIndex((c) => c.id === contactId);

    if (index === -1) {
      return null; // Контакт не знайдено
    }

    const [removedContact] = contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removedContact;
  } catch (error) {
    console.error("Error removing contact:", error);
    return null;
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await readContactsFile();
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
}
