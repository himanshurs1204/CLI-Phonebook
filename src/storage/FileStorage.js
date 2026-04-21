/*
  File Storage Module
  Handles all file I/O operations for persisting contacts
  This is the Data Access Layer (DAL)
 */

const fs = require("fs");
const path = require("path");

const CONTACTS_FILE = path.join(__dirname, "../../contacts.json");

// Load all contacts from JSON file
function loadContacts() {
  try {
    if (!fs.existsSync(CONTACTS_FILE)) {
      // If file doesn't exist, create empty file with empty array
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2), "utf8");
      return [];
    }

    const data = fs.readFileSync(CONTACTS_FILE, "utf8");
    const contacts = JSON.parse(data);
    return Array.isArray(contacts) ? contacts : [];
  } catch (error) {
    console.error(`Error loading contacts from file: ${error.message}`);
    return [];
  }
}

// Save contacts to JSON file
function saveContacts(contacts) {
  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error(`Error saving contacts to file: ${error.message}`);
    return false;
  }
}

// Get file path (useful for debugging/testing)
function getContactsFilePath() {
  return CONTACTS_FILE;
}

module.exports = {
  loadContacts,
  saveContacts,
  getContactsFilePath,
};
