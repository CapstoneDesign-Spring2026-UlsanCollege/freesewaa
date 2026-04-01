import React, { useState, useMemo } from 'react';
import './BrowseItems.css';
import CategoryFilter from './CategoryFilter';
import ItemDetailModal from './ItemDetailModal';

/**
 * Sample donation items for demo purposes.
 * In a real app these would come from the backend/database.
 */
const SAMPLE_ITEMS = [
  {
    id: 1,
    title: 'Wooden Bookshelf',
    description:
      'A sturdy 5-shelf wooden bookshelf, light oak colour. Some minor scratches on the bottom shelf but otherwise in great shape. Perfect for a student room or home office.',
    category: 'Furniture',
    location: 'Ulsan, South Korea',
    condition: 'Good',
    contactEmail: 'donor1@example.com',
    contactPhone: '+82 10-1111-2222',
    postedAt: '2026-03-20T10:00:00Z',
  },
  {
    id: 2,
    title: 'Winter Jacket (M)',
    description:
      'Warm navy-blue winter jacket, men\'s size M. Barely worn — bought last year and no longer needed. No tears or stains.',
    category: 'Clothing',
    location: 'Busan, South Korea',
    condition: 'Like New',
    contactEmail: 'donor2@example.com',
    contactPhone: '+82 10-3333-4444',
    postedAt: '2026-03-21T14:30:00Z',
  },
  {
    id: 3,
    title: 'React & JavaScript Book Set',
    description:
      'Set of 3 programming books: "You Don\'t Know JS", "Eloquent JavaScript", and "Learning React". All in good reading condition with some highlights.',
    category: 'Books',
    location: 'Seoul, South Korea',
    condition: 'Good',
    contactEmail: 'donor3@example.com',
    contactPhone: '',
    postedAt: '2026-03-22T09:15:00Z',
  },
  {
    id: 4,
    title: 'Kitchen Blender',
    description:
      'Philips HR2041 blender. Works perfectly, all parts included. Giving away because we upgraded to a larger model.',
    category: 'Kitchen',
    location: 'Incheon, South Korea',
    condition: 'Like New',
    contactEmail: 'donor4@example.com',
    contactPhone: '+82 10-5555-6666',
    postedAt: '2026-03-23T11:00:00Z',
  },
  {
    id: 5,
    title: 'Yoga Mat',
    description:
      'Purple 6mm non-slip yoga mat, lightly used. Includes carrying strap. Great for home workouts or outdoor sessions.',
    category: 'Sports',
    location: 'Daegu, South Korea',
    condition: 'Good',
    contactEmail: 'donor5@example.com',
    contactPhone: '+82 10-7777-8888',
    postedAt: '2026-03-24T08:00:00Z',
  },
  {
    id: 6,
    title: 'LEGO Classic Set (400 pcs)',
    description:
      'LEGO Classic set, 400 pieces, all pieces present. Box is a bit worn but all bricks are clean and intact. Great for kids 5+.',
    category: 'Toys',
    location: 'Ulsan, South Korea',
    condition: 'Good',
    contactEmail: 'donor6@example.com',
    contactPhone: '',
    postedAt: '2026-03-25T16:45:00Z',
  },
];

/**
 * BrowseItems component — shows the item grid with category filtering.
 * Issue #30: Category filter with dynamic item list updates.
 * Issue #27/#29: Clicking an item opens ItemDetailModal with request flow.
 */
function BrowseItems() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  // Combine sample items with any user-posted items from localStorage
  const allItems = useMemo(() => {
    const saved = JSON.parse(localStorage.getItem('donationItems') || '[]');
    return [...SAMPLE_ITEMS, ...saved];
  }, []);

  // Filter items based on selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return allItems;
    return allItems.filter((item) => item.category === selectedCategory);
  }, [allItems, selectedCategory]);

  const conditionColor = (condition) => {
    const map = {
      New: '#1565c0',
      'Like New': '#6a1b9a',
      Good: '#2e7d32',
      Fair: '#e65100',
      Poor: '#b71c1c',
    };
    return map[condition] || '#555';
  };

  return (
    <div className="browse-items-container">
      <div className="browse-header">
        <h2 className="browse-title">Available Donations</h2>
        <p className="browse-subtitle">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} available
          {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
        </p>
      </div>

      {/* Category filter — Issue #30 */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Item grid */}
      {filteredItems.length === 0 ? (
        <div className="no-items">
          <span className="no-items-icon">📭</span>
          <p>No items found in this category.</p>
          <button
            className="btn-reset-filter"
            onClick={() => setSelectedCategory('All')}
          >
            Show All Items
          </button>
        </div>
      ) : (
        <div className="items-grid">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              className="item-card"
              onClick={() => setSelectedItem(item)}
              aria-label={`View details for ${item.title}`}
            >
              <div className="item-card-body">
                <span className="item-category">{item.category}</span>
                <h3 className="item-title">{item.title}</h3>
                <p className="item-description">{item.description}</p>
              </div>
              <div className="item-card-footer">
                <span className="item-location">📍 {item.location}</span>
                <span
                  className="item-condition"
                  style={{ color: conditionColor(item.condition) }}
                >
                  {item.condition}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Item detail modal — Issues #27 & #29 */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}

export default BrowseItems;
