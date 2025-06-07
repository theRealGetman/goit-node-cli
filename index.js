import { program } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      if (!id) {
        console.warn("\x1B[31m Please provide an id!");
        return;
      }
      const contact = await getContactById(id);
      if (!contact) {
        console.warn("\x1B[31m Contact not found!");
        return;
      }
      console.log(contact);
      break;

    case "add":
      if (!name || !email || !phone) {
        console.warn("\x1B[31m Please provide name, email, and phone!");
        return;
      }
      const newContact = await addContact(name, email, phone);
      console.log("Contact added:", newContact);
      break;

    case "remove":
      if (!id) {
        console.warn("\x1B[31m Please provide an id!");
        return;
      }
      const removedContact = await removeContact(id);
      if (!removedContact) {
        console.warn("\x1B[31m Contact not found!");
        return;
      }
      console.log("Contact removed:", removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
