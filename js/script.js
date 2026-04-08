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
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Signing in...</span>';
    submitBtn.disabled = true;

    try {
      const isEmailMode = !emailForm.classList.contains("hidden");

      if (isEmailMode) {
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
          alert("Please enter email and password.");
          return;
        }

        const data = await api.auth.login({
          email: email,
          password: password
        });

        saveAuth(data.token, data.user);
        alert("Login successful!");
        window.location.href = "home.html";
      } else {
        alert("Phone login requires backend setup. Please use email login.");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || "Invalid email or password.");
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}
