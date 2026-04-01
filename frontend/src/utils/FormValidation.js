/**
 * FormValidation.js
 * Utility functions for validating the PostItem form fields.
 * Issue #28 - Approach for Item Posting Form Validation
 */

/**
 * Validates a single field value against a set of rules.
 * Returns an error message string, or an empty string if valid.
 *
 * @param {string} name  - Field name key
 * @param {string} value - Field value to validate
 * @returns {string} Error message or empty string
 */
export function validateField(name, value) {
  const trimmed = typeof value === 'string' ? value.trim() : value;

  switch (name) {
    case 'title':
      if (!trimmed) return 'Title is required.';
      if (trimmed.length < 3) return 'Title must be at least 3 characters.';
      if (trimmed.length > 100) return 'Title must be 100 characters or fewer.';
      return '';

    case 'description':
      if (!trimmed) return 'Description is required.';
      if (trimmed.length < 10) return 'Description must be at least 10 characters.';
      if (trimmed.length > 500) return 'Description must be 500 characters or fewer.';
      return '';

    case 'category':
      if (!trimmed) return 'Please select a category.';
      return '';

    case 'location':
      if (!trimmed) return 'Location is required.';
      return '';

    case 'condition':
      if (!trimmed) return 'Please select the item condition.';
      return '';

    case 'contactEmail':
      if (!trimmed) return 'Contact email is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return 'Please enter a valid email address.';
      }
      return '';

    case 'contactPhone':
      if (trimmed && !/^[\d\s\-+(). ]{7,20}$/.test(trimmed)) {
        return 'Please enter a valid phone number.';
      }
      return '';

    default:
      return '';
  }
}

/**
 * Validates all form fields at once.
 * Returns an object mapping field names to error messages.
 *
 * @param {Object} formData - Object containing all form field values
 * @returns {Object} Errors object { fieldName: errorMessage }
 */
export function validateForm(formData) {
  const errors = {};
  const requiredFields = ['title', 'description', 'category', 'location', 'condition', 'contactEmail'];

  requiredFields.forEach((field) => {
    const error = validateField(field, formData[field] || '');
    if (error) errors[field] = error;
  });

  // Validate optional phone only if provided
  if (formData.contactPhone) {
    const phoneError = validateField('contactPhone', formData.contactPhone);
    if (phoneError) errors.contactPhone = phoneError;
  }

  return errors;
}

/**
 * Returns true if the errors object has no error messages.
 *
 * @param {Object} errors - Errors object from validateForm
 * @returns {boolean}
 */
export function isFormValid(errors) {
  return Object.values(errors).every((msg) => !msg);
}
