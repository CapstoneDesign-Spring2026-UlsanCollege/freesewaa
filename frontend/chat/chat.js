/* =============================================
   Chat / Messages — JavaScript
   Message rendering + send functionality
   ============================================= */

'use strict';

const messagesArea = document.getElementById('messagesArea');
const msgInput     = document.getElementById('msgInput');
const sendBtn      = document.getElementById('sendBtn');

// ── Enable / disable send button based on input ──
msgInput.addEventListener('input', () => {
  const hasText = msgInput.value.trim().length > 0;
  sendBtn.disabled = !hasText;

  // Auto-grow textarea (up to 5 lines)
  msgInput.style.height = 'auto';
  msgInput.style.height = Math.min(msgInput.scrollHeight, 120) + 'px';
});

// ── Send on Enter (Shift+Enter for newline) ───────
msgInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!sendBtn.disabled) sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

// ── Build a message row element ───────────────────
function createMessageRow(text, direction) {
  const now   = new Date();
  const hours = now.getHours();
  const mins  = String(now.getMinutes()).padStart(2, '0');
  const ampm  = hours >= 12 ? 'PM' : 'AM';
  const h12   = ((hours % 12) || 12);
  const timeStr = `${h12}:${mins} ${ampm}`;

  const row = document.createElement('div');
  row.className = `msg-row ${direction}`;

  if (direction === 'outgoing') {
    row.innerHTML = `
      <div class="msg-group">
        <div class="msg-bubble">${escapeHtml(text)}</div>
        <div class="msg-time">${timeStr}</div>
      </div>
      <div class="msg-avatar recipient" aria-hidden="true">Y</div>
    `;
  } else {
    row.innerHTML = `
      <div class="msg-avatar donor" aria-hidden="true">J</div>
      <div class="msg-group">
        <div class="msg-bubble">${escapeHtml(text)}</div>
        <div class="msg-time">${timeStr}</div>
      </div>
    `;
  }

  return row;
}

// ── Send a message ────────────────────────────────
function sendMessage() {
  const text = msgInput.value.trim();
  if (!text) return;

  const row = createMessageRow(text, 'outgoing');
  messagesArea.appendChild(row);
  scrollToBottom();

  // Reset input
  msgInput.value = '';
  msgInput.style.height = 'auto';
  sendBtn.disabled = true;
  msgInput.focus();
}

// ── Scroll to the latest message ─────────────────
function scrollToBottom() {
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

// ── Escape HTML to prevent XSS ───────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Init: scroll to bottom of existing messages ──
scrollToBottom();
