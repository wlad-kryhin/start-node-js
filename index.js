const { Command } = require("commander");
const program = new Command();
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require("./contacts.js");
const chalk = require("chalk");
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
(async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const user = await getContactById(id);
        if (user) {
          console.log(chalk.blue("Contact found"));
          console.log(user);
        } else {
          console.log(chalk.red("Contact not found"));
        }
        break;

      case "add":
        const contact = await addContact(name, email, phone);
        console.log(chalk.greenBright("Add new contact"));
        console.log(contact);
        break;

      case "remove":
        const removeUser = await removeContact(id);
        console.table(removeUser);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error.message);
  }
})(argv);
