const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");
const otpError = document.getElementById("otpError");

const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyBtn = document.getElementById("verifyBtn");
const googleBtn = document.getElementById("googleBtn");

const otpPanel = document.getElementById("otpPanel");
const otpInputs = document.querySelectorAll(".otp-box");
const timerText = document.getElementById("timerText");

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");

let countdownInterval = null;
let countdown = 30;
const DEMO_OTP = "123456";

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  bindEvents();
  bindRipple(document.querySelectorAll(".ripple-btn"));
});

function bindEvents() {
  sendOtpBtn.addEventListener("click", handleSendOtp);
  verifyBtn.addEventListener("click", handleVerifyOtp);
  googleBtn.addEventListener("click", handleGoogleLogin);

  phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/[^\d-]/g, "");
    clearError(phoneError);
  });

  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => handleOtpInput(e, index));
    input.addEventListener("keydown", (e) => handleOtpKeydown(e, index));
    input.addEventListener("paste", handleOtpPaste);
  });

  timerText.addEventListener("click", () => {
    if (!timerText.classList.contains("active")) return;
    handleSendOtp(true);
  });
}

function handleSendOtp(isResend = false) {
  const phoneValue = phoneInput.value.trim();

  clearError(phoneError);
  clearError(otpError);

  if (!isValidPhone(phoneValue)) {
    phoneError.textContent = "Please enter a valid Korean phone number.";
    return;
  }

  setButtonLoading(sendOtpBtn, true);

  setTimeout(() => {
    setButtonLoading(sendOtpBtn, false);
    otpPanel.classList.remove("hidden");
    otpInputs.forEach((input) => (input.value = ""));
    otpInputs[0].focus();
    startTimer();

    showToast(
      isResend ? "OTP Sent Again" : "OTP Sent",
      `A 6-digit code has been sent to +82 ${phoneValue}. Demo OTP: ${DEMO_OTP}`
    );
  }, 900);
}

function handleVerifyOtp() {
  const code = Array.from(otpInputs).map((input) => input.value).join("");
  clearError(otpError);

  if (code.length !== 6) {
    otpError.textContent = "Please enter the full 6-digit OTP.";
    return;
  }

  if (code !== DEMO_OTP) {
    otpError.textContent = "Invalid OTP. Please try again.";
    return;
  }

  setButtonLoading(verifyBtn, true);

  setTimeout(() => {
    setButtonLoading(verifyBtn, false);
    showToast("Login Successful", "Redirecting you to the homepage...");
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1200);
  }, 900);
}

function handleGoogleLogin() {
  showToast("Google Sign-In", "Google authentication can be connected to your backend later.");
}

function handleOtpInput(e, index) {
  const input = e.target;
  input.value = input.value.replace(/\D/g, "").slice(0, 1);

  if (input.value && index < otpInputs.length - 1) {
    otpInputs[index + 1].focus();
  }

  clearError(otpError);
}

function handleOtpKeydown(e, index) {
  if (e.key === "Backspace" && !otpInputs[index].value && index > 0) {
    otpInputs[index - 1].focus();
  }
}

function handleOtpPaste(e) {
  e.preventDefault();
  const pastedData = (e.clipboardData || window.clipboardData)
    .getData("text")
    .replace(/\D/g, "")
    .slice(0, 6);

  if (!pastedData) return;

  otpInputs.forEach((input, index) => {
    input.value = pastedData[index] || "";
  });

  const nextIndex = Math.min(pastedData.length, otpInputs.length - 1);
  otpInputs[nextIndex].focus();
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 11;
}

function startTimer() {
  clearInterval(countdownInterval);
  countdown = 30;
  updateTimerUI();

  countdownInterval = setInterval(() => {
    countdown--;

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      timerText.textContent = "Resend OTP";
      timerText.disabled = false;
      timerText.classList.add("active");
      return;
    }

    updateTimerUI();
  }, 1000);
}

function updateTimerUI() {
  timerText.disabled = true;
  timerText.classList.remove("active");
  timerText.textContent = `Resend in 00:${String(countdown).padStart(2, "0")}`;
}

function clearError(element) {
  element.textContent = "";
}

function setButtonLoading(button, isLoading) {
  const btnText = button.querySelector(".btn-text");
  const loader = button.querySelector(".loader");

  if (isLoading) {
    btnText.style.opacity = "0.6";
    loader.classList.remove("hidden");
    button.disabled = true;
  } else {
    btnText.style.opacity = "1";
    loader.classList.add("hidden");
    button.disabled = false;
  }
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