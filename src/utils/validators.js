/**
 * Validators Utility
 * Contains validation functions for contact input
 */

// Validate contact name
function validateName(name) {
  if (!name || name.trim() === "") {
    return { valid: false, error: "Name cannot be empty." };
  }
  return { valid: true };
}

// Validate contact phone
function validatePhone(phone) {
  if (!phone || phone.trim() === "") {
    return { valid: false, error: "Phone number cannot be empty." };
  }
  return { valid: true };
}

// Validate email (optional but if provided should be basic format)
function validateEmail(email) {
  if (!email || email.trim() === "") {
    return { valid: true }; // Email is optional
  }
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: "Invalid email format." };
  }
  return { valid: true };
}

// Validate all inputs together
function validateContactInput(name, phone, email = null) {
  // Validate name
  const nameValidation = validateName(name);
  if (!nameValidation.valid) {
    return nameValidation;
  }

  // Validate phone
  const phoneValidation = validatePhone(phone);
  if (!phoneValidation.valid) {
    return phoneValidation;
  }

  // Validate email if provided
  if (email) {
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return emailValidation;
    }
  }

  return { valid: true };
}

module.exports = {
  validateName,
  validatePhone,
  validateEmail,
  validateContactInput,
};
