const ITEM_KEY = "freeSewaaItems";

const form = document.getElementById("form");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("desc");
const categoryInput = document.getElementById("category");
const conditionInput = document.getElementById("condition");
const locationInput = document.getElementById("location");
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");

const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");
const categoryError = document.getElementById("categoryError");
const conditionError = document.getElementById("conditionError");
const locationError = document.getElementById("locationError");

const titleCount = document.getElementById("titleCount");
const descCount = document.getElementById("descCount");

const previewMedia = document.getElementById("previewMedia");
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

let uploadedImage = "";

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  bindEvents();
  updatePreview();
  updateCounts();
});

function bindEvents() {
  titleInput.addEventListener("input", handleLiveUpdate);
  descInput.addEventListener("input", handleLiveUpdate);
  categoryInput.addEventListener("change", handleLiveUpdate);
  conditionInput.addEventListener("change", handleLiveUpdate);
  locationInput.addEventListener("input", handleLiveUpdate);

  imageUpload.addEventListener("change", handleImageUpload);

  form.addEventListener("submit", handleSubmit);

  toastClose.addEventListener("click", () => {
    toast.classList.remove("show");
  });
}

function handleLiveUpdate() {
  updatePreview();
  updateCounts();
  clearAllErrors();
}

function handleImageUpload() {
  const file = imageUpload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    uploadedImage = reader.result;
    imagePreview.src = uploadedImage;
    imagePreview.classList.remove("hidden");
    updatePreview();
  };
  reader.readAsDataURL(file);
}

function updateCounts() {
  titleCount.textContent = `${titleInput.value.length} / 60`;
  descCount.textContent = `${descInput.value.length} / 220`;
}

function updatePreview() {
  previewCondition.textContent = conditionInput.value || "Condition";
  previewCategory.textContent = categoryInput.value || "Category";
  previewTitle.textContent = titleInput.value.trim() || "Your item title";
  previewDesc.textContent =
    descInput.value.trim() || "Your item description will appear here as you type.";
  previewLocation.textContent = locationInput.value.trim() || "Location";

  if (uploadedImage) {
    previewMedia.innerHTML = `
      <img src="${uploadedImage}" alt="Preview image" />
      <span class="preview-badge">${conditionInput.value || "Condition"}</span>
    `;
  } else {
    previewMedia.innerHTML = `
      <div class="preview-emoji" id="previewEmoji">📦</div>
      <span class="preview-badge">${conditionInput.value || "Condition"}</span>
    `;
  }
}

function handleSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    showToast("Validation Error", "Please complete all required fields correctly.");
    return;
  }

  const itemData = {
    id: Date.now(),
    title: titleInput.value.trim(),
    description: descInput.value.trim(),
    category: categoryInput.value,
    condition: conditionInput.value,
    location: locationInput.value.trim(),
    image: uploadedImage || "",
    donor: "You",
    posted: "Just now"
  };

  saveItem(itemData);
  addNotification(`New item posted: ${itemData.title}`, "item");

  showToast("Item Posted", "Your donation item has been posted successfully.");

  form.reset();
  uploadedImage = "";
  imagePreview.src = "";
  imagePreview.classList.add("hidden");
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

function clearAllErrors() {
  [titleError, descError, categoryError, conditionError, locationError].forEach((el) => {
    el.textContent = "";
  });
}

function saveItem(item) {
  const existingItems = JSON.parse(localStorage.getItem(ITEM_KEY)) || [];
  existingItems.unshift(item);
  localStorage.setItem(ITEM_KEY, JSON.stringify(existingItems));
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