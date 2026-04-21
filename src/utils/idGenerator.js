/**
 * ID Generator Utility
 * Generates unique IDs for contacts
 */

// Generate next unique ID based on existing contacts
function generateId(contacts) {
  if (!contacts || contacts.length === 0) {
    return 1;
  }

  // Find the maximum ID and increment by 1
  const maxId = Math.max(...contacts.map((contact) => contact.id));
  return maxId + 1;
}

module.exports = {
  generateId,
};
