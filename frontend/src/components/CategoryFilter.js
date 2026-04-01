import React from 'react';
import './CategoryFilter.css';

/**
 * Hardcoded list of item categories.
 * Issue #30: Category Filter Implementation for Item Listings.
 */
export const CATEGORIES = [
  'All',
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

/**
 * CategoryFilter component — renders category filter buttons.
 *
 * Props:
 *   selectedCategory {string}   - Currently active category.
 *   onSelectCategory {Function} - Called with the selected category string.
 */
function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter" role="navigation" aria-label="Filter by category">
      <span className="filter-label">Filter by category:</span>
      <div className="filter-buttons">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
