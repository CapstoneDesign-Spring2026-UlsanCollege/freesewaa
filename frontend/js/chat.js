const CHAT_KEY = "freeSewaaChats";
const ITEM_KEY = "freeSewaaItems";
const DEFAULT_KEY = "freeSewaaDefaultItems";

const messagesDiv = document.getElementById("messages");
const chatForm = document.getElementById("chatForm");
const msgInput = document.getElementById("msgInput");

const chatTitle = document.getElementById("chatTitle");
const chatSubtitle = document.getElementById("chatSubtitle");
const itemTitle = document.getElementById("itemTitle");
const itemMeta = document.getElementById("itemMeta");
const chatItemImage = document.getElementById("chatItemImage");

const currentItemId = Number(localStorage.getItem("freeSewaaChatItemId"));

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  renderChatHeader();
  loadMessages();

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
  });
});

function getAllItems() {
  const saved = JSON.parse(localStorage.getItem(ITEM_KEY)) || [];
  const defaults = JSON.parse(localStorage.getItem(DEFAULT_KEY)) || [];
  return [...saved, ...defaults];
}

function getCurrentItem() {
  return getAllItems().find((item) => item.id === currentItemId);
}

function renderChatHeader() {
  const item = getCurrentItem();

  if (!item) {
    chatTitle.textContent = "Chat";
    chatSubtitle.textContent = "No item selected.";
    itemTitle.textContent = "No item selected";
    itemMeta.textContent = "Go back and open chat from an item card.";
    return;
  }

  chatTitle.textContent = `Chat about "${item.title}"`;
  chatSubtitle.textContent = `Talk with ${item.donor || "the donor"} about this item.`;
  itemTitle.textContent = item.title;
  itemMeta.textContent = `${item.location} • ${item.category}`;

  if (item.image) {
    chatItemImage.innerHTML = `<img src="${item.image}" alt="${item.title}" />`;
  } else {
    chatItemImage.textContent = "📦";
  }
}

function getChatStore() {
  return JSON.parse(localStorage.getItem(CHAT_KEY)) || {};
}

function saveChatStore(store) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(store));
}

function getMessagesForItem(itemId) {
  const store = getChatStore();
  return store[itemId] || [];
}

function loadMessages() {
  const messages = getMessagesForItem(currentItemId);
  messagesDiv.innerHTML = "";

  if (!messages.length) {
    messagesDiv.innerHTML = `
      <div class="message other">
        Hi! I’m interested in this item. Is it still available?
        <small>System demo</small>
      </div>
    `;
    return;
  }

  messages.forEach((msg) => {
    const messageEl = document.createElement("div");
    messageEl.className = `message ${msg.sender === "You" ? "self" : "other"}`;
    messageEl.innerHTML = `
      ${escapeHtml(msg.text)}
      <small>${msg.sender} • ${msg.time}</small>
    `;
    messagesDiv.appendChild(messageEl);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {
  const text = msgInput.value.trim();
  if (!text || !currentItemId) return;

  const store = getChatStore();
  const itemMessages = store[currentItemId] || [];

  itemMessages.push({
    sender: "You",
    text,
    time: new Date().toLocaleTimeString()
  });

  store[currentItemId] = itemMessages;
  saveChatStore(store);

  msgInput.value = "";
  loadMessages();

  addNotification(`New chat message sent about item #${currentItemId}`, "chat");

  // auto reply demo
  setTimeout(() => {
    const replyStore = getChatStore();
    const replyMessages = replyStore[currentItemId] || [];

    replyMessages.push({
      sender: "Donor",
      text: "Thanks for your message. Yes, this item is still available.",
      time: new Date().toLocaleTimeString()
    });

    replyStore[currentItemId] = replyMessages;
    saveChatStore(replyStore);
    loadMessages();
    addNotification("You received a new message from the donor.", "chat");
  }, 900);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}