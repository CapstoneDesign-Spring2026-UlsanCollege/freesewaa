const emailBtn = document.getElementById("emailBtn");
const phoneBtn = document.getElementById("phoneBtn");
const emailForm = document.getElementById("emailForm");
const phoneForm = document.getElementById("phoneForm");

if (emailBtn && phoneBtn && emailForm && phoneForm) {
  emailBtn.addEventListener("click", () => {
    emailBtn.classList.add("active");
    phoneBtn.classList.remove("active");
    emailForm.classList.remove("hidden");
    phoneForm.classList.add("hidden");
  });

  phoneBtn.addEventListener("click", () => {
    phoneBtn.classList.add("active");
    emailBtn.classList.remove("active");
    phoneForm.classList.remove("hidden");
    emailForm.classList.add("hidden");
  });
}

const passwordToggles = document.querySelectorAll(".toggle-password");

passwordToggles.forEach((icon) => {
  icon.addEventListener("click", () => {
    const targetId = icon.getAttribute("data-target");
    const input = document.getElementById(targetId);

    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
});

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const isEmailMode = !emailForm.classList.contains("hidden");

    if (isEmailMode) {
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      const savedUser = JSON.parse(localStorage.getItem("freeSewaaUser"));

      if (!savedUser) {
        alert("No account found. Please sign up first.");
        return;
      }

      if (savedUser.email === email && savedUser.password === password) {
        alert("Login successful!");
        window.location.href = "home.html";
      } else {
        alert("Invalid email or password.");
      }
    } else {
      const code = document.getElementById("countryCode").value.trim();
      const phone = document.getElementById("phoneNumber").value.trim();
      const savedPhoneUser = JSON.parse(localStorage.getItem("freeSewaaPhoneUser"));

      if (!savedPhoneUser) {
        alert("No phone account found. Please sign up first.");
        return;
      }

      if (savedPhoneUser.countryCode === code && savedPhoneUser.phone === phone) {
        alert("Phone login successful!");
        window.location.href = "home.html";
      } else {
        alert("Invalid phone number.");
      }
    }
  });
}