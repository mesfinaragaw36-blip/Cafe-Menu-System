// Shared by every page: header menu, login state, footer year, back to top.

const header  = document.getElementById("site-header");
const toggle  = document.getElementById("nav-toggle");
const menu    = document.getElementById("site-menu");
const actions = document.getElementById("header-actions");

// ---- Phone menu: open and close ----
function setMenu(open) {
  menu.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));

// Close after a link is clicked
menu.addEventListener("click", event => {
  if (event.target.closest("a")) setMenu(false);
});

// Close with the Escape key
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menu.classList.contains("open")) {
    setMenu(false);
    toggle.focus();
  }
});

// Close when clicking outside the header
document.addEventListener("click", event => {
  if (menu.classList.contains("open") && !header.contains(event.target)) setMenu(false);
});

// Reset when the window becomes wide again
window.matchMedia("(min-width: 900px)").addEventListener("change", event => {
  if (event.matches) setMenu(false);
});

// ---- If someone is logged in, show their name and a Log out button ----
try {
  const session = JSON.parse(localStorage.getItem("mayaSession"));

  if (session && session.name) {
    actions.innerHTML = "";

    const hello = document.createElement("span");
    hello.className = "user-name";
    hello.textContent = "Hi, " + session.name;

    const logout = document.createElement("button");
    logout.type = "button";
    logout.className = "btn-outline";
    logout.textContent = "Log out";
    logout.addEventListener("click", () => {
      localStorage.removeItem("mayaSession");
      window.location.href = "index.html";
    });

    actions.appendChild(hello);
    actions.appendChild(logout);
  }
} catch (error) {
  // No valid login saved: keep the Login and Sign up buttons.
}

// ---- Footer: current year and "Back to top" ----
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const topBtn = document.getElementById("back-to-top");
if (topBtn) topBtn.addEventListener("click", () => window.scrollTo({ top: 0 }));