import React, { useState } from 'react';
import './PostItem.css';
import { validateField, validateForm, isFormValid } from '../utils/FormValidation';

const CATEGORIES = [
  'Books',
  'Clothing',
  'Electronics',
  'Furniture',
  'Kitchen',
  'Sports',
  'Toys',
  'Decor',
  'Other',
];

const CONDITIONS = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

const EMPTY_FORM = {
  title: '',
  description: '',
  category: '',
  location: '',
  condition: '',
  contactEmail: '',
  contactPhone: '',
};

/**
 * PostItem component — allows donors to post items for donation.
 * Issue #28: Includes full field validation with inline error messages.
 */
function PostItem() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Revalidate the changed field if it was already touched
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched and validate everything
    const allTouched = Object.keys(EMPTY_FORM).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (!isFormValid(formErrors)) return;

    // Save item to localStorage
    const items = JSON.parse(localStorage.getItem('donationItems') || '[]');
    const newItem = {
      id: Date.now(),
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
      postedAt: new Date().toISOString(),
    };
    items.push(newItem);
    localStorage.setItem('donationItems', JSON.stringify(items));

    setSubmitted(true);
    setFormData(EMPTY_FORM);
    setTouched({});
    setErrors({});
  };

  const handlePostAnother = () => {
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="post-item-success">
        <div className="success-icon">✅</div>
        <h2>Item Posted Successfully!</h2>
        <p>Your donation item has been listed. Thank you for giving back to the community! 💚</p>
        <button className="btn-primary" onClick={handlePostAnother}>
          Post Another Item
        </button>
      </div>
    );
  }

  return (
    <div className="post-item-container">
      <h2 className="post-item-title">Post a Donation Item</h2>
      <p className="post-item-subtitle">Fill in the details below to share your item with the community.</p>

      <form className="post-item-form" onSubmit={handleSubmit} noValidate>
        {/* Title */}
        <div className={`form-group ${touched.title && errors.title ? 'has-error' : ''}`}>
          <label htmlFor="title">Item Title <span className="required">*</span></label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Wooden Bookshelf"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={100}
          />
          {touched.title && errors.title && (
            <span className="error-message">{errors.title}</span>
          )}
        </div>

        {/* Description */}
        <div className={`form-group ${touched.description && errors.description ? 'has-error' : ''}`}>
          <label htmlFor="description">Description <span className="required">*</span></label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the item — size, color, any defects, etc."
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            maxLength={500}
          />
          <span className="char-count">{formData.description.length}/500</span>
          {touched.description && errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        {/* Category */}
        <div className={`form-group ${touched.category && errors.category ? 'has-error' : ''}`}>
          <label htmlFor="category">Category <span className="required">*</span></label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">— Select a category —</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {touched.category && errors.category && (
            <span className="error-message">{errors.category}</span>
          )}
        </div>

        {/* Condition */}
        <div className={`form-group ${touched.condition && errors.condition ? 'has-error' : ''}`}>
          <label htmlFor="condition">Condition <span className="required">*</span></label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">— Select condition —</option>
            {CONDITIONS.map((cond) => (
              <option key={cond} value={cond}>{cond}</option>
            ))}
          </select>
          {touched.condition && errors.condition && (
            <span className="error-message">{errors.condition}</span>
          )}
        </div>

        {/* Location */}
        <div className={`form-group ${touched.location && errors.location ? 'has-error' : ''}`}>
          <label htmlFor="location">Location <span className="required">*</span></label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. Ulsan, South Korea"
            value={formData.location}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.location && errors.location && (
            <span className="error-message">{errors.location}</span>
          )}
        </div>

        {/* Contact Email */}
        <div className={`form-group ${touched.contactEmail && errors.contactEmail ? 'has-error' : ''}`}>
          <label htmlFor="contactEmail">Contact Email <span className="required">*</span></label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            placeholder="you@example.com"
            value={formData.contactEmail}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.contactEmail && errors.contactEmail && (
            <span className="error-message">{errors.contactEmail}</span>
          )}
        </div>

        {/* Contact Phone (optional) */}
        <div className={`form-group ${touched.contactPhone && errors.contactPhone ? 'has-error' : ''}`}>
          <label htmlFor="contactPhone">Contact Phone <span className="optional">(optional)</span></label>
          <input
            id="contactPhone"
            name="contactPhone"
            type="tel"
            placeholder="e.g. +82 10-1234-5678"
            value={formData.contactPhone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.contactPhone && errors.contactPhone && (
            <span className="error-message">{errors.contactPhone}</span>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary submit-btn"
        >
          Post Item
        </button>
      </form>
    </div>
  );
}

export default PostItem;
