/* =============================================
   Post Item — JavaScript
   Form validation + success flow
   ============================================= */

'use strict';

const form          = document.getElementById('donateForm');
const formCard      = document.getElementById('formCard');
const postedCard    = document.getElementById('postedCard');
const successFlash  = document.getElementById('successFlash');
const charCount     = document.getElementById('charCount');
const postAnotherBtn = document.getElementById('postAnotherBtn');

// ── Character counter ─────────────────────────
const descTextarea = document.getElementById('itemDescription');
descTextarea.addEventListener('input', () => {
  const len = descTextarea.value.length;
  charCount.textContent = `${len} / 500`;
});

// ── Validation helpers ────────────────────────
function setError(inputId, errorId, message) {
  const el  = document.getElementById(inputId);
  const err = document.getElementById(errorId);
  if (el) el.classList.toggle('invalid', !!message);
  if (err) err.textContent = message || '';
}

function clearErrors() {
  ['itemTitle', 'itemCategory', 'itemDescription', 'itemLocation', 'itemContact']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('invalid');
    });

  ['titleError', 'categoryError', 'conditionError', 'descriptionError', 'locationError', 'contactError']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
}

function validate() {
  let valid = true;

  const title       = document.getElementById('itemTitle').value.trim();
  const category    = document.getElementById('itemCategory').value;
  const description = descTextarea.value.trim();
  const location    = document.getElementById('itemLocation').value.trim();
  const contact     = document.getElementById('itemContact').value.trim();
  const condition   = document.querySelector('input[name="condition"]:checked');

  if (!title) {
    setError('itemTitle', 'titleError', 'Please enter an item title.');
    valid = false;
  }

  if (!category) {
    setError('itemCategory', 'categoryError', 'Please select a category.');
    valid = false;
  }

  if (!condition) {
    document.getElementById('conditionError').textContent = 'Please select a condition.';
    valid = false;
  }

  if (!description) {
    setError('itemDescription', 'descriptionError', 'Please add a description.');
    valid = false;
  } else if (description.length < 10) {
    setError('itemDescription', 'descriptionError', 'Description must be at least 10 characters.');
    valid = false;
  }

  if (!location) {
    setError('itemLocation', 'locationError', 'Please enter a pickup location.');
    valid = false;
  }

  if (!contact) {
    setError('itemContact', 'contactError', 'Please enter your name or contact details.');
    valid = false;
  }

  return valid;
}

// ── Submit ────────────────────────────────────
form.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();

  if (!validate()) return;

  // Show success state
  formCard.hidden    = true;
  postedCard.hidden  = false;
  successFlash.classList.add('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Post another ──────────────────────────────
postAnotherBtn.addEventListener('click', () => {
  form.reset();
  charCount.textContent  = '0 / 500';
  postedCard.hidden      = true;
  formCard.hidden        = false;
  successFlash.classList.remove('show');
  clearErrors();
  document.getElementById('itemTitle').focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
