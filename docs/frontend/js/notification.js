const NOTIFICATION_KEY = "freeSewaaNotifications";

function getNotifications() {
  return JSON.parse(localStorage.getItem(NOTIFICATION_KEY)) || [];
}

function saveNotifications(list) {
  localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(list));
}

function addNotification(message, type = "info") {
  const notifications = getNotifications();

  notifications.unshift({
    id: Date.now(),
    message,
    type,
    read: false,
    time: new Date().toLocaleString()
  });

  saveNotifications(notifications);

  if (typeof showToast === "function") {
    showToast("Notification", message);
  }

  window.dispatchEvent(new Event("notificationsUpdated"));
}

function markAllNotificationsRead() {
  const notifications = getNotifications().map((item) => ({
    ...item,
    read: true
  }));

  saveNotifications(notifications);
  window.dispatchEvent(new Event("notificationsUpdated"));
}

function getUnreadNotificationCount() {
  return getNotifications().filter((item) => !item.read).length;
}