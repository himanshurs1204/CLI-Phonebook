// Menu.js - Command-line interface for the phonebook application
// This module provides the user interface for interacting with the phonebook application
// It uses the ContactService to perform operations and displays results to the user


const readline = require("readline");
const { createContactService } = require("../services/ContactService");

// Create menu with functional approach
function createMenu() {
  const contactService = createContactService();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Display main menu
  function showMainMenu() {
   console.log("\n+----------------------------+");
console.log("|      Phonebook Menu        |");
console.log("+----------------------------+");
console.log("| 1. Add Contact             |");
console.log("| 2. View All Contacts       |");
console.log("| 3. Search Contact          |");
console.log("| 4. Update Contact          |");
console.log("| 5. Delete Contact          |");
console.log("| 6. Exit                    |");
console.log("+----------------------------+");

    rl.question("Choose an option (1-6): ", (choice) => {
      handleMenuChoice(choice.trim());
    });
  }

  // Handle user's menu choice
  function handleMenuChoice(choice) {
    switch (choice) {
      case "1":
        handleAddContact();
        break;
      case "2":
        handleViewContacts();
        break;
      case "3":
        handleSearchContact();
        break;
      case "4":
        handleUpdateContact();
        break;
      case "5":
        handleDeleteContact();
        break;
      case "6":
        handleExit();
        break;
      default:
        console.log(
          "❌ Invalid choice. Please enter a number between 1 and 6.",
        );
        showMainMenu();
    }
  }

  // Handle Add Contact flow
  function handleAddContact() {
    rl.question("\nEnter contact name: ", (name) => {
      rl.question("Enter phone number: ", (phone) => {
        rl.question(
          "Enter email (optional, press Enter to skip): ",
          (email) => {
            const result = contactService.addContact(
              name,
              phone,
              email || null,
            );

            if (result.success) {
              console.log(
                `✓ Contact added successfully! (ID: ${result.contact.id})`,
              );
            } else {
              console.log(`❌ Error: ${result.error}`);
            }

            showMainMenu();
          },
        );
      });
    });
  }

  // Handle View All Contacts
  function handleViewContacts() {
    const contacts = contactService.getAllContacts();

    if (contacts.length === 0) {
      console.log("\n📭 No contacts found.");
      showMainMenu();
      return;
    }

   console.log("\n+----------------------------+");
console.log("|       All Contacts         |");
console.log("+----------------------------+");
    contacts.forEach((contact, index) => {
      console.log(`\n[${index + 1}] ID: ${contact.id}`);
      console.log(`    Name:  ${contact.name}`);
      console.log(`    Phone: ${contact.phone}`);
      if (contact.email) {
        console.log(`    Email: ${contact.email}`);
      }
    });

    console.log();
    showMainMenu();
  }

  // Handle Search Contact
  function handleSearchContact() {
    rl.question("\nEnter name to search: ", (searchTerm) => {
      const result = contactService.searchContactsByName(searchTerm);

      if (result.success) {
        console.log(`\n✓ Found ${result.results.length} result(s):`);
        result.results.forEach((contact) => {
          console.log(`\n  ID: ${contact.id}`);
          console.log(`  Name:  ${contact.name}`);
          console.log(`  Phone: ${contact.phone}`);
          if (contact.email) {
            console.log(`  Email: ${contact.email}`);
          }
        });
      } else {
        console.log(`\n❌ ${result.error}`);
      }

      console.log();
      showMainMenu();
    });
  }

  // Handle Update Contact
  function handleUpdateContact() {
    rl.question("\nEnter contact ID to update: ", (idInput) => {
      const id = parseInt(idInput, 10);
      const contact = contactService.findContactById(id);

      if (!contact) {
        console.log("❌ Error: Contact not found.");
        showMainMenu();
        return;
      }

      console.log(`\nCurrent contact: ${contact.name} | ${contact.phone}`);
      rl.question(
        "Enter new name (press Enter to keep current): ",
        (newName) => {
          rl.question(
            "Enter new phone (press Enter to keep current): ",
            (newPhone) => {
              rl.question(
                "Enter new email (press Enter to keep current): ",
                (newEmail) => {
                  const updates = {};
                  if (newName.trim()) updates.name = newName;
                  if (newPhone.trim()) updates.phone = newPhone;
                  if (newEmail.trim()) updates.email = newEmail;

                  const result = contactService.updateContact(id, updates);

                  if (result.success) {
                    console.log("✓ Contact updated successfully.");
                  } else {
                    console.log(`❌ Error: ${result.error}`);
                  }

                  showMainMenu();
                },
              );
            },
          );
        },
      );
    });
  }

  // Handle Delete Contact
  function handleDeleteContact() {
    rl.question("\nEnter contact ID to delete: ", (idInput) => {
      const id = parseInt(idInput, 10);

      const result = contactService.deleteContact(id);

      if (result.success) {
        console.log(`✓ Contact "${result.contact.name}" deleted successfully.`);
      } else {
        console.log(`❌ Error: ${result.error}`);
      }

      showMainMenu();
    });
  }

  // Handle Exit
  function handleExit() {
    console.log("\nThank you for using Phonebook. Goodbye! 👋\n");
    rl.close();
    process.exit(0);
  }

  // Start the application
  function start() {
    console.log("\n╔════════════════════════════════╗");
    console.log("║  Welcome to Phonebook CLI! 📱  ║");
    console.log("╚════════════════════════════════╝");

    showMainMenu();
  }

  // Return public API
  return { start };
}

module.exports = {
  createMenu,
};
