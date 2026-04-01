const items = [
  {
    id: 1,
    title: "Books Set",
    category: "Books",
    condition: "Good condition",
    location: "Ulsan",
    donor: "Mina Park",
    posted: "2 hours ago",
    description:
      "A set of educational and story books in very good condition. Great for students, children, or anyone who loves reading.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    title: "Wooden Chair",
    category: "Furniture",
    condition: "Used lightly",
    location: "Busan",
    donor: "David Kim",
    posted: "5 hours ago",
    description:
      "Comfortable wooden chair with a clean finish. Ideal for a study corner, bedroom, or workspace.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    title: "Winter Jacket",
    category: "Clothes",
    condition: "Clean condition",
    location: "Seoul",
    donor: "Hana Lee",
    posted: "Today",
    description:
      "Warm winter jacket, freshly cleaned and ready to use. Suitable for cold weather and daily wear.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    title: "Kids Toy Box",
    category: "Toys",
    condition: "Very good",
    location: "Daegu",
    donor: "Arjun Sharma",
    posted: "1 day ago",
    description:
      "Mixed toy collection for children including blocks, stuffed toys, and simple learning materials.",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    title: "Study Desk Lamp",
    category: "Electronics",
    condition: "Working perfectly",
    location: "Incheon",
    donor: "Ariana Cho",
    posted: "3 days ago",
    description:
      "Modern desk lamp with adjustable brightness. Great for desks, office tables, or bedside use.",
    image:
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    title: "T-Shirts Bundle",
    category: "Clothes",
    condition: "Neat and wearable",
    location: "Daejeon",
    donor: "Kevin Jung",
    posted: "Yesterday",
    description:
      "A bundle of casual t-shirts in good condition. Soft fabric and suitable for everyday use.",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80"
  }
];

let filteredItems = [...items];
let activeCategory = "all";
let sortMode = "newest";

const itemsGrid = document.getElementById("itemsGrid");
const skeletonGrid = document.getElementById("skeletonGrid");
const emptyState = document.getElementById("emptyState");

const heroSearch = document.getElementById("heroSearch");
const navSearch = document.getElementById("navSearch");
const mobileSearch = document.getElementById("mobileSearch");
const itemsSearch = document.getElementById("itemsSearch");

const searchBtn = document.getElementById("searchBtn");
const browseBtn = document.getElementById("browseBtn");
const scrollBrowseBtn = document.getElementById("scrollBrowseBtn");
const sortBtn = document.getElementById("sortBtn");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");

const categoryFilters = document.getElementById("categoryFilters");

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const header = document.getElementById("header");

const fakeLinks = document.querySelectorAll(".fake-link");
const navLinks = document.querySelectorAll(".nav-link, .mobile-link");
const revealEls = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");
const toastClose = document.getElementById("toastClose");

const itemModal = document.getElementById("itemModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalCondition = document.getElementById("modalCondition");
const modalLocation = document.getElementById("modalLocation");
const modalDescription = document.getElementById("modalDescription");
const modalDonor = document.getElementById("modalDonor");
const modalPosted = document.getElementById("modalPosted");
const modalImage = document.getElementById("modalImage");

const requestBtn = document.getElementById("requestBtn");
const saveBtn = document.getElementById("saveBtn");

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  setupEvents();
  startRevealAnimations();
  startCounters();
  fakeLoadItems();
});

function setupEvents() {
  searchBtn?.addEventListener("click", handleSearch);
  browseBtn?.addEventListener("click", () => {
    scrollToSection("discover");
    showToast("Browse Items", "Showing recently shared community items.");
  });

  scrollBrowseBtn?.addEventListener("click", () => {
    scrollToSection("discover");
  });

  [heroSearch, navSearch, mobileSearch, itemsSearch].forEach((input) => {
    input?.addEventListener("input", () => {
      syncSearchInputs(input.value);
      applyFilters();
    });
  });

  categoryFilters?.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;

    document.querySelectorAll(".filter-chip").forEach((btn) => btn.classList.remove("active"));
    chip.classList.add("active");
    activeCategory = chip.dataset.category;
    applyFilters();
  });

  sortBtn?.addEventListener("click", toggleSortMode);
  resetFiltersBtn?.addEventListener("click", resetFilters);

  fakeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const action = link.dataset.action || "feature";
      fakeNavigation(action);
    });
  });

  menuBtn?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();
      scrollToSection(href.replace("#", ""));
      mobileMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  toastClose?.addEventListener("click", () => toast.classList.remove("show"));

  closeModal?.addEventListener("click", closeItemModal);
  itemModal?.addEventListener("click", (e) => {
    if (e.target === itemModal) closeItemModal();
  });

  requestBtn?.addEventListener("click", () => {
    showToast("Request Sent", "Your request has been submitted successfully.");
    closeItemModal();
  });

  saveBtn?.addEventListener("click", () => {
    showToast("Saved", "This item has been added to your saved list.");
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    updateActiveNav();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeItemModal();
  });

  bindRipple(document.querySelectorAll(".ripple-btn"));
}

function fakeLoadItems() {
  skeletonGrid.classList.remove("hidden");
  itemsGrid.classList.add("hidden");
  emptyState.classList.add("hidden");

  setTimeout(() => {
    skeletonGrid.classList.add("hidden");
    itemsGrid.classList.remove("hidden");
    renderItems(items);
  }, 1100);
}

function renderItems(list) {
  itemsGrid.innerHTML = "";

  if (!list.length) {
    itemsGrid.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  itemsGrid.classList.remove("hidden");

  list.forEach((item) => {
    const card = document.createElement("article");
    card.className = "item-card";

    card.innerHTML = `
      <div class="item-media">
        <span class="item-badge">${item.condition}</span>
        <button class="item-like ripple-btn" aria-label="Save item">
          <i data-lucide="heart"></i>
        </button>
        <img src="${item.image}" alt="${item.title}" />
      </div>

      <div class="item-body">
        <div class="item-topline">
          <span class="item-category">${item.category}</span>
          <span class="item-time">${item.posted}</span>
        </div>

        <h3 class="item-title">${item.title}</h3>
        <p class="item-text">${item.description}</p>

        <p class="item-location">
          <i data-lucide="map-pin"></i>
          ${item.location}
        </p>

        <div class="item-actions">
          <button class="item-btn primary ripple-btn" data-view-id="${item.id}">
            View Details
          </button>
          <button class="item-btn secondary ripple-btn" data-request-id="${item.id}">
            Request
          </button>
        </div>
      </div>
    `;

    itemsGrid.appendChild(card);
  });

  lucide.createIcons();
  bindCardActions();
  bindRipple(document.querySelectorAll(".ripple-btn"));
}

function bindCardActions() {
  document.querySelectorAll("[data-view-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = Number(btn.dataset.viewId);
      const item = items.find((entry) => entry.id === itemId);
      if (item) openItemModal(item);
    });
  });

  document.querySelectorAll("[data-request-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast("Open Details", "View the item details to complete your request.");
    });
  });

  document.querySelectorAll(".item-like").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast("Saved", "Item added to favorites.");
    });
  });
}

function handleSearch() {
  const query = heroSearch.value.trim();
  syncSearchInputs(query);
  applyFilters();
  scrollToSection("discover");

  showToast(
    "Search Applied",
    query ? `Showing results for "${query}".` : "Showing all available items."
  );
}

function applyFilters() {
  const query = (itemsSearch.value || "").trim().toLowerCase();

  filteredItems = items.filter((item) => {
    const text = `${item.title} ${item.description} ${item.location} ${item.category}`.toLowerCase();
    const matchesSearch = text.includes(query);
    const matchesCategory =
      activeCategory === "all" || item.category.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  if (sortMode === "newest") {
    filteredItems.sort((a, b) => a.id - b.id);
  } else {
    filteredItems.sort((a, b) => a.title.localeCompare(b.title));
  }

  renderItems(filteredItems);
}

function toggleSortMode() {
  sortMode = sortMode === "newest" ? "az" : "newest";
  sortBtn.innerHTML =
    sortMode === "newest"
      ? `<i data-lucide="arrow-up-down"></i> Sort: Newest`
      : `<i data-lucide="arrow-up-down"></i> Sort: A–Z`;

  lucide.createIcons();
  applyFilters();
}

function resetFilters() {
  activeCategory = "all";
  sortMode = "newest";

  document.querySelectorAll(".filter-chip").forEach((btn) => btn.classList.remove("active"));
  document.querySelector('.filter-chip[data-category="all"]')?.classList.add("active");

  syncSearchInputs("");
  itemsSearch.value = "";
  sortBtn.innerHTML = `<i data-lucide="arrow-up-down"></i> Sort: Newest`;
  lucide.createIcons();

  renderItems(items);
  showToast("Filters Reset", "All items are visible again.");
}

function syncSearchInputs(value) {
  [heroSearch, navSearch, mobileSearch, itemsSearch].forEach((input) => {
    if (input && input.value !== value) input.value = value;
  });
}

function openItemModal(item) {
  modalTitle.textContent = item.title;
  modalCategory.textContent = item.category;
  modalCondition.textContent = item.condition;
  modalLocation.textContent = item.location;
  modalDescription.textContent = item.description;
  modalDonor.textContent = item.donor;
  modalPosted.textContent = item.posted;
  modalImage.src = item.image;
  modalImage.alt = item.title;

  itemModal.classList.add("show");
  itemModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeItemModal() {
  itemModal.classList.remove("show");
  itemModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showToast(title, message) {
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function fakeNavigation(action) {
  const map = {
    upload: {
      title: "Upload Page",
      message: "Upload flow is ready for your next screen."
    },
    profile: {
      title: "Profile Page",
      message: "Profile section can be connected to your user dashboard."
    },
    feature: {
      title: "Coming Soon",
      message: "This feature is ready to be connected later."
    }
  };

  const result = map[action] || map.feature;
  showToast(result.title, result.message);
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  let currentSection = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;

    if (window.scrollY >= top && window.scrollY < top + height) {
      currentSection = section.id;
    }
  });

  if (!currentSection) return;

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

function startRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

function startCounters() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.target);
        animateCounter(el, target);
        obs.unobserve(el);
      });
    },
    { threshold: 0.7 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(el, target) {
  let current = 0;
  const duration = 1200;
  const increment = Math.max(1, Math.floor(target / (duration / 16)));

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    el.textContent = target >= 1000 ? `${current.toLocaleString()}+` : `${current}+`;
  }, 16);
}

function bindRipple(elements) {
  elements.forEach((button) => {
    if (button.dataset.rippleBound === "true") return;

    button.dataset.rippleBound = "true";
    button.addEventListener("click", createRipple);
  });
}

function createRipple(e) {
  const button = e.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  const rect = button.getBoundingClientRect();

  circle.className = "ripple";
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;

  const existingRipple = button.querySelector(".ripple");
  if (existingRipple) existingRipple.remove();

  button.appendChild(circle);
}