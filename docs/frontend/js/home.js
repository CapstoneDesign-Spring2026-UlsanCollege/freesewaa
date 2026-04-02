const notifBtn = document.getElementById("notifBtn");
const notifDropdown = document.getElementById("notifDropdown");
const notifList = document.getElementById("notifList");
const notifCount = document.getElementById("notifCount");
const markReadBtn = document.getElementById("markReadBtn");

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  renderNotifications();

  notifBtn.addEventListener("click", () => {
    notifDropdown.classList.toggle("hidden");
  });

  markReadBtn.addEventListener("click", () => {
    markAllNotificationsRead();
    renderNotifications();
    showToast("Notifications", "All notifications marked as read.");
  });

  window.addEventListener("notificationsUpdated", renderNotifications);

  document.addEventListener("click", (e) => {
    if (!notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
      notifDropdown.classList.add("hidden");
    }
  });
});

function renderNotifications() {
  const notifications = getNotifications();
  notifCount.textContent = getUnreadNotificationCount();

  if (!notifications.length) {
    notifList.innerHTML = `<div class="notif-item"><p>No notifications yet.</p></div>`;
    return;
  }

  notifList.innerHTML = notifications
    .map(
      (item) => `
        <div class="notif-item">
          <p>${item.message}</p>
          <small>${item.time}</small>
        </div>
      `
    )
    .join("");
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