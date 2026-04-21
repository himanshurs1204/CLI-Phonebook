// ContactService.js - Service layer for managing contacts
// This module provides business logic for contact operations and interacts with the FileStorage for data persistence.


const { createContact } = require("../models/Contact");
const FileStorage = require("../storage/FileStorage");
const { generateId } = require("../utils/idGenerator");
const { validateContactInput, validateEmail } = require("../utils/validators");

// Create contact service with current contacts
function createContactService() {
  let contacts = FileStorage.loadContacts();

  // Get all contacts
  function getAllContacts() {
    return contacts;
  }

  // Find contact by ID
  function findContactById(id) {
    return contacts.find((c) => c.id === id);
  }

  // Add new contact
  function addContact(name, phone, email = null) {
    // Validate input
    const validation = validateContactInput(name, phone, email);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Check for duplicate phone number
    const phoneExists = contacts.some((c) => c.phone === phone.trim());
    if (phoneExists) {
      return { success: false, error: "Phone number already exists." };
    }

    // Create new contact
    const id = generateId(contacts);
    const newContact = createContact(
      id,
      name.trim(),
      phone.trim(),
      email ? email.trim() : null,
    );

    // Add to list and save
    contacts.push(newContact);
    FileStorage.saveContacts(contacts);

    return { success: true, contact: newContact };
  }

  // Update contact by ID
  function updateContact(id, updates) {
    const contact = findContactById(id);
    if (!contact) {
      return { success: false, error: "Contact not found." };
    }

    // Validate new phone if being updated
    if (updates.phone && updates.phone !== contact.phone) {
      const phoneExists = contacts.some(
        (c) => c.id !== id && c.phone === updates.phone.trim(),
      );
      if (phoneExists) {
        return { success: false, error: "Phone number already exists." };
      }
    }

    // Validate email if being updated
    if (updates.email !== undefined) {
      if (updates.email && updates.email.trim()) {
        const emailValidation = validateEmail(updates.email);
        if (!emailValidation.valid) {
          return { success: false, error: emailValidation.error };
        }
      }
    }

    // Update fields
    if (updates.name) {
      contact.name = updates.name.trim();
    }
    if (updates.phone) {
      contact.phone = updates.phone.trim();
    }
    if (updates.email !== undefined) {
      contact.email = updates.email ? updates.email.trim() : null;
    }

    // Save changes
    FileStorage.saveContacts(contacts);
    return { success: true, contact };
  }

  // Delete contact by ID
  function deleteContact(id) {
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) {
      return { success: false, error: "Contact not found." };
    }

    const deletedContact = contacts[index];
    contacts.splice(index, 1);
    FileStorage.saveContacts(contacts);

    return { success: true, contact: deletedContact };
  }

  // Search contacts by name (case-insensitive partial match)
  function searchContactsByName(searchTerm) {
    if (!searchTerm || searchTerm.trim() === "") {
      return { success: false, error: "Search term cannot be empty." };
    }

    const lowerSearchTerm = searchTerm.trim().toLowerCase();
    const results = contacts.filter((c) =>
      c.name.toLowerCase().includes(lowerSearchTerm),
    );

    if (results.length === 0) {
      return {
        success: false,
        error: `No contacts found matching "${searchTerm}".`,
      };
    }

    return { success: true, results };
  }

  // Get contact count
  function getContactCount() {
    return contacts.length;
  }

  // Return public API
  return {
    getAllContacts,
    addContact,
    findContactById,
    updateContact,
    deleteContact,
    searchContactsByName,
    getContactCount,
  };
}

module.exports = {
  createContactService,
};
