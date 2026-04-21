/**
 * Contact Model
 * Represents the structure of a contact object using functional approach
 */

// Create a contact object
function createContact(id, name, phone, email = null) {
  return {
    id,
    name,
    phone,
    email,
  };
}

// Serialize contact to JSON format
function toJSON(contact) {
  return {
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
  };
}

// Deserialize contact from JSON data
function fromJSON(data) {
  return createContact(data.id, data.name, data.phone, data.email);
}

module.exports = {
  createContact,
  toJSON,
  fromJSON,
};
