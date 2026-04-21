/*
Phonebook CLI Application - Entry Point
 This is the main entry point of the application
 It initializes and starts the CLI menu interface
 Using functional programming approach
 */

const { createMenu } = require("./src/ui/Menu");

// Create menu instance using factory function and start the application
const menu = createMenu();
menu.start();
