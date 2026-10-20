// ===== Settings =====
const DELAY_MS = 4000;                          // how long to wait before the popup appears
const STORAGE_KEY = "newsletterModalDismissed"; // remembers that the popup was closed

// ===== Elements =====
const modal = document.getElementById("signup-modal");
const closeBtn = document.getElementById("close-modal");
const noThanksBtn = document.getElementById("no-thanks");
const doneBtn = document.getElementById("done");
const form = document.getElementById("signup-form");
const emailInput = document.getElementById("email");
const errorEl = document.getElementById("email-error");
const signupView = document.getElementById("signup-view");
const successView = document.getElementById("success-view");
const successText = document.getElementById("success-text");
const resetBtn = document.getElementById("reset-demo");

// ===== Remember the choice (localStorage can be blocked, so every call is wrapped) =====
function wasDismissed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch (err) {
    return false;
  }
}

function rememberDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, "true");
  } catch (err) {
    /* storage unavailable: the popup may appear again on the next visit */
  }
}

function forgetDismissed() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    /* nothing to do */
  }
}

// ===== Email validation =====
// Something, an @, something, a dot, and at least 2 letters at the end. No spaces.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Returns an error message, or "" when the email is valid
function validateEmail(value) {
  const email = value.trim();
  if (email === "") return "Please enter your email address.";
  if (!EMAIL_PATTERN.test(email)) return "Please enter a valid email, like name@example.com.";
  return "";
}

function showError(message) {
  errorEl.textContent = message;
  emailInput.setAttribute("aria-invalid", message ? "true" : "false");
}

// ===== Open and close =====
function openModal() {
  if (modal.open) return;
  signupView.hidden = false;
  successView.hidden = true;
  form.reset();
  showError("");
  modal.showModal();                // native dialog: focus trap, Escape key and backdrop come built in
  document.body.classList.add("modal-open");
  emailInput.focus();
}

function closeModal() {
  if (modal.open) modal.close();
}

// Runs every way the dialog can close: X button, overlay click, Escape, No thanks, Done
modal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  rememberDismissed();              // never show it again after it has been closed
});

closeBtn.addEventListener("click", closeModal);
noThanksBtn.addEventListener("click", closeModal);
doneBtn.addEventListener("click", closeModal);

// Overlay click: the dialog has no padding, so a click whose target is the dialog itself hit the backdrop
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ===== Form handling =====
emailInput.addEventListener("input", () => showError(""));   // clear the message while typing

form.addEventListener("submit", (e) => {
  e.preventDefault();               // no page reload
  const message = validateEmail(emailInput.value);

  if (message) {
    showError(message);
    emailInput.focus();
    return;
  }

  // This is a front-end demo: the email is not sent or stored anywhere
  successText.textContent = "Thanks! We will send your first tip to " + emailInput.value.trim() + ".";
  signupView.hidden = true;
  successView.hidden = false;
  doneBtn.focus();
  rememberDismissed();
});

// ===== Start the timer =====
if (!wasDismissed()) {
  setTimeout(openModal, DELAY_MS);
}

// Demo button: forget the choice and show the popup again straight away
resetBtn.addEventListener("click", () => {
  forgetDismissed();
  openModal();
});