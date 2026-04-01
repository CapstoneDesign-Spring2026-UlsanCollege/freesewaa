/* =============================================
   Browse Items — JavaScript
   Sample data + rendering + modal logic
   ============================================= */

'use strict';

// ── Sample donated items ──────────────────────
const ITEMS = [
  {
    id: 1,
    title: 'Winter Jacket (Size M)',
    category: 'clothing',
    categoryLabel: 'Clothing',
    emoji: '🧥',
    description: 'A warm navy-blue winter jacket in like-new condition. Worn only twice. Great for cold weather. Size medium.',
    condition: 'Like New',
    conditionClass: 'like-new',
    location: 'Ulsan, Nam-gu',
    donor: 'Jihun K.'
  },
  {
    id: 2,
    title: 'Calculus Textbook (3rd Ed.)',
    category: 'books',
    categoryLabel: 'Books',
    emoji: '📚',
    description: 'University-level calculus textbook, 3rd edition. Some highlights inside but fully readable. Perfect for engineering students.',
    condition: 'Good',
    conditionClass: 'good',
    location: 'Ulsan, Dong-gu',
    donor: 'Soyeon P.'
  },
  {
    id: 3,
    title: 'Wooden Study Desk',
    category: 'furniture',
    categoryLabel: 'Furniture',
    emoji: '🪑',
    description: 'Solid wood study desk (120×60 cm). Minor surface scratches but fully functional. Pickup only — please bring help to carry.',
    condition: 'Good',
    conditionClass: 'good',
    location: 'Ulsan, Buk-gu',
    donor: 'Minho L.'
  },
  {
    id: 4,
    title: 'Wireless Bluetooth Speaker',
    category: 'electronics',
    categoryLabel: 'Electronics',
    emoji: '🔊',
    description: 'Compact Bluetooth speaker with 8-hour battery life. No charger included — uses USB-C (standard). Works perfectly.',
    condition: 'Used',
    conditionClass: 'used',
    location: 'Ulsan, Junggu',
    donor: 'Eunji C.'
  },
  {
    id: 5,
    title: 'Children\'s Puzzle Set (4 puzzles)',
    category: 'toys',
    categoryLabel: 'Toys & Games',
    emoji: '🧩',
    description: 'Set of 4 wooden puzzles for ages 3–7. All pieces included and checked. Bright colours, excellent learning toy.',
    condition: 'Like New',
    conditionClass: 'like-new',
    location: 'Ulsan, Ulju-gun',
    donor: 'Yumi S.'
  },
  {
    id: 6,
    title: 'Men\'s Dress Shirts (3 pack, Size L)',
    category: 'clothing',
    categoryLabel: 'Clothing',
    emoji: '👔',
    description: 'Three men\'s button-up dress shirts, size large. White, light blue, and grey. Clean and ironed. Great for job interviews.',
    condition: 'Good',
    conditionClass: 'good',
    location: 'Ulsan, Nam-gu',
    donor: 'Taehwan O.'
  }
];

// ── State ────────────────────────────────────
let activeCategory = 'all';
let searchQuery    = '';
let selectedItem   = null;

// ── DOM refs ─────────────────────────────────
const grid          = document.getElementById('itemsGrid');
const resultCount   = document.getElementById('resultCount');
const emptyState    = document.getElementById('emptyState');
const searchInput   = document.getElementById('searchInput');
const filterBtns    = document.querySelectorAll('.filter-btn');
const modalOverlay  = document.getElementById('modalOverlay');
const modalClose    = document.getElementById('modalClose');
const requestBtn    = document.getElementById('requestBtn');
const backToBrowse  = document.getElementById('backToBrowseBtn');
const requestStep   = document.getElementById('requestStep');
const confirmStep   = document.getElementById('confirmStep');

// ── Render ───────────────────────────────────
function getFiltered() {
  return ITEMS.filter(item => {
    const matchCat    = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery) ||
                        item.description.toLowerCase().includes(searchQuery) ||
                        item.categoryLabel.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });
}

function renderItems() {
  const filtered = getFiltered();

  grid.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.hidden = false;
    resultCount.textContent = '0 items found';
    return;
  }

  emptyState.hidden = true;
  resultCount.textContent = `${filtered.length} item${filtered.length !== 1 ? 's' : ''} found`;

  filtered.forEach(item => {
    const card = document.createElement('article');
    card.className = 'item-card';
    card.tabIndex  = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${item.title}`);
    card.innerHTML = `
      <div class="card-img">${item.emoji}</div>
      <div class="card-body">
        <span class="card-category">${item.categoryLabel}</span>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        <div class="card-meta">
          <span class="condition-badge ${item.conditionClass}">${item.condition}</span>
          <span>📍 ${item.location}</span>
        </div>
      </div>
    `;

    card.addEventListener('click',  () => openModal(item));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(item); });

    grid.appendChild(card);
  });
}

// ── Modal ─────────────────────────────────────
function openModal(item) {
  selectedItem = item;

  document.getElementById('modalEmoji').textContent       = item.emoji;
  document.getElementById('modalCategory').textContent    = item.categoryLabel;
  document.getElementById('modalTitle').textContent       = item.title;
  document.getElementById('modalDescription').textContent = item.description;
  document.getElementById('modalCondition').textContent   = item.condition;
  document.getElementById('modalLocation').textContent    = item.location;
  document.getElementById('modalDonor').textContent       = item.donor;

  // Reset to request step
  requestStep.hidden  = false;
  confirmStep.hidden  = true;

  modalOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modalOverlay.hidden = true;
  document.body.style.overflow = '';
}

// ── Event listeners ───────────────────────────

// Search
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  renderItems();
});

// Category filters
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    renderItems();
  });
});

// Close modal
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modalOverlay.hidden) closeModal(); });

// Request Item
requestBtn.addEventListener('click', () => {
  requestStep.hidden = true;
  confirmStep.hidden = false;
});

// Back to browse from confirmation
backToBrowse.addEventListener('click', closeModal);

// ── Init ─────────────────────────────────────
renderItems();
