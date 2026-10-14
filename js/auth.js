// Registration and login for Maya Cafe (frontend only).
//
// WARNING: this is a learning demo. Accounts are saved in the browser's
// localStorage, and the password is stored as plain text. A real website must
// send the form to a server, which hashes the password and keeps it in a
// database. Never type a real password into this demo.

const USERS_KEY = "mayaUsers";
const SESSION_KEY = "mayaSession";

function getUsers() {
  const storedUsers = localStorage.getItem(USERS_KEY);
  if (!storedUsers) return [];

  const users = JSON.parse(storedUsers);
  if (!Array.isArray(users)) throw new Error("Saved accounts are not in a valid format.");
  return users;
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function showMessage(text, type) {
  const box = document.getElementById("form-message");
  box.textContent = text;
  box.className = "form-message " + type;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---- Registration ----
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (!name) return showMessage("Please enter your full name.", "error");
    if (!isValidEmail(email)) return showMessage("Please enter a valid email address.", "error");
    if (password.length < 6) return showMessage("The password must be at least 6 characters.", "error");
    if (password !== confirm) return showMessage("The two passwords do not match.", "error");

    let users;
    try {
      users = getUsers();
      if (users.some(user => user.email === email)) {
        return showMessage("An account with this email already exists.", "error");
      }

      users.push({ name, email, password });
      saveUsers(users);
    } catch (error) {
      return showMessage("Could not read or save accounts in this browser. Please enable browser storage and try again.", "error");
    }

    showMessage("Account created. Taking you to the login page...", "success");
    setTimeout(() => { window.location.href = "login.html"; }, 1200);
  });
}

// ---- Login ----
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (!isValidEmail(email) || !password) {
      return showMessage("Please enter your email and password.", "error");
    }

    let user;
    try {
      user = getUsers().find(u => u.email === email && u.password === password);
    } catch (error) {
      return showMessage("Could not read saved accounts in this browser. Please check browser storage and try again.", "error");
    }
    if (!user) return showMessage("Wrong email or password.", "error");

    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
    } catch (error) {
      return showMessage("Could not start your session. Please enable browser storage and try again.", "error");
    }
    showMessage("Welcome back, " + user.name + ". Taking you to the menu...", "success");
    setTimeout(() => { window.location.href = "index.html"; }, 1000);
  });
}