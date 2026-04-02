const signupEmailBtn = document.getElementById("signupEmailBtn");
const signupPhoneBtn = document.getElementById("signupPhoneBtn");
const signupEmailForm = document.getElementById("signupEmailForm");
const signupPhoneForm = document.getElementById("signupPhoneForm");
const signupForm = document.getElementById("signupForm");

if (signupEmailBtn && signupPhoneBtn && signupEmailForm && signupPhoneForm) {
  signupEmailBtn.addEventListener("click", () => {
    signupEmailBtn.classList.add("active");
    signupPhoneBtn.classList.remove("active");
    signupEmailForm.classList.remove("hidden");
    signupPhoneForm.classList.add("hidden");
  });

  signupPhoneBtn.addEventListener("click", () => {
    signupPhoneBtn.classList.add("active");
    signupEmailBtn.classList.remove("active");
    signupPhoneForm.classList.remove("hidden");
    signupEmailForm.classList.add("hidden");
  });
}

const signupPasswordToggles = document.querySelectorAll(".toggle-password");

signupPasswordToggles.forEach((icon) => {
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

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const isEmailMode = !signupEmailForm.classList.contains("hidden");

    if (isEmailMode) {
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      if (!fullName || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      localStorage.setItem(
        "freeSewaaUser",
        JSON.stringify({
          fullName,
          email,
          password,
        })
      );

      alert("Account created successfully! Please sign in.");
      window.location.href = "index.html";
    } else {
      const fullName = document.getElementById("phoneFullName").value.trim();
      const countryCode = document.getElementById("signupCountryCode").value.trim();
      const phone = document.getElementById("signupPhone").value.trim();
      const password = document.getElementById("phoneSignupPassword").value.trim();
      const confirmPassword = document.getElementById("phoneConfirmPassword").value.trim();

      if (!fullName || !countryCode || !phone || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      localStorage.setItem(
        "freeSewaaPhoneUser",
        JSON.stringify({
          fullName,
          countryCode,
          phone,
          password,
        })
      );

      alert("Phone account created successfully! Please sign in.");
      window.location.href = "index.html";
    }
  });
}