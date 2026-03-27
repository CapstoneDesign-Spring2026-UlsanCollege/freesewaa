const form = document.getElementById("form");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("desc");
const categoryInput = document.getElementById("category");
const conditionInput = document.getElementById("condition");
const locationInput = document.getElementById("location");
const imageInput = document.getElementById("image");

const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");
const categoryError = document.getElementById("categoryError");
const conditionError = document.getElementById("conditionError");
const locationError = document.getElementById("locationError");

const titleCount = document.getElementById("titleCount");
const descCount = document.getElementById("descCount");

const previewEmoji = document.getElementById("previewEmoji");
const previewCondition = document.getElementById("previewCondition");
const previewCategory = document.getElementById("previewCategory");
const previewTitle = document.getElementById("previewTitle");
const previewDesc = document.getElementById("previewDesc");
const previewLocation = document.getElementById("previewLocation");

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");
const toastClose = document.getElementById("toastClose");

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  bindEvents();
  updatePreview();
  updateCounts();
  bindRipple(document.querySelectorAll(".ripple-btn"));
});

function bindEvents() {
  titleInput.addEventListener("input", () => {
    updatePreview();
    updateCounts();
    clearError(titleError);
  });

  descInput.addEventListener("input", () => {
    updatePreview();
    updateCounts();
    clearError(descError);
  });

  categoryInput.addEventListener("change", () => {
    updatePreview();
    clearError(categoryError);
  });

  conditionInput.addEventListener("change", () => {
    updatePreview();
    clearError(conditionError);
  });

  locationInput.addEventListener("input", () => {
    updatePreview();
    clearError(locationError);
  });

  imageInput.addEventListener("change", updatePreview);

  form.addEventListener("submit", handleSubmit);

  toastClose.addEventListener("click", () => {
    toast.classList.remove("show");
  });
}

function updateCounts() {
  titleCount.textContent = `${titleInput.value.length} / 60`;
  descCount.textContent = `${descInput.value.length} / 220`;
}

function updatePreview() {
  previewEmoji.textContent = imageInput.value || "📦";
  previewCondition.textContent = conditionInput.value || "Condition";
  previewCategory.textContent = categoryInput.value || "Category";
  previewTitle.textContent = titleInput.value.trim() || "Your item title";
  previewDesc.textContent =
    descInput.value.trim() || "Your item description will appear here as you type.";
  previewLocation.textContent = locationInput.value.trim() || "Location";
}

function handleSubmit(event) {
  event.preventDefault();

  const isValid = validateForm();
  if (!isValid) {
    showToast("Validation Error", "Please complete all required fields correctly.");
    return;
  }

  const itemData = {
    title: titleInput.value.trim(),
    description: descInput.value.trim(),
    category: categoryInput.value,
    condition: conditionInput.value,
    location: locationInput.value.trim(),
    image: imageInput.value,
    donor: "You",
    posted: "Just now",
    id: Date.now()
  };

  saveItem(itemData);

  showToast("Item Posted", "Your donation item has been posted successfully.");
  form.reset();
  updatePreview();
  updateCounts();
  clearAllErrors();
}

function validateForm() {
  let valid = true;

  clearAllErrors();

  if (!titleInput.value.trim()) {
    titleError.textContent = "Item title is required.";
    valid = false;
  }

  if (!descInput.value.trim()) {
    descError.textContent = "Description is required.";
    valid = false;
  }

  if (!categoryInput.value) {
    categoryError.textContent = "Please select a category.";
    valid = false;
  }

  if (!conditionInput.value) {
    conditionError.textContent = "Please select the item condition.";
    valid = false;
  }

  if (!locationInput.value.trim()) {
    locationError.textContent = "Location is required.";
    valid = false;
  }

  return valid;
}

function clearError(element) {
  element.textContent = "";
}

function clearAllErrors() {
  [titleError, descError, categoryError, conditionError, locationError].forEach((el) => {
    el.textContent = "";
  });
}

function saveItem(item) {
  const existingItems = JSON.parse(localStorage.getItem("freeSewaaItems")) || [];
  existingItems.unshift(item);
  localStorage.setItem("freeSewaaItems", JSON.stringify(existingItems));
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

function bindRipple(elements) {
  elements.forEach((button) => {
    if (button.dataset.rippleBound === "true") return;

    button.dataset.rippleBound = "true";
    button.addEventListener("click", createRipple);
  });
}

function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  const rect = button.getBoundingClientRect();

  circle.className = "ripple";
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;

  const existingRipple = button.querySelector(".ripple");
  if (existingRipple) existingRipple.remove();

  button.appendChild(circle);
}
