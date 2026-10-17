// Home page menu: category filters, item cards, item details, and search.
// Needs js/data.js to be loaded first.

const searchEl = document.getElementById("search");
const categoriesView = document.getElementById("categories-view");
const resultsView = document.getElementById("results-view");
const menuListsEl = document.getElementById("menu-lists");
const resultsEl = document.getElementById("results");

const modalEl = document.getElementById("modal");
const modalBoxEl = document.getElementById("modal-box");
const modalTitleEl = document.getElementById("modal-title");
const modalImageEl = document.getElementById("modal-image");
const modalCategoryEl = document.getElementById("modal-category");
const modalPriceEl = document.getElementById("modal-price");
const modalDescriptionEl = document.getElementById("modal-description");
const modalStatusEl = document.getElementById("modal-status");
const modalAddEl = document.getElementById("modal-add");
const modalCloseBtn = document.getElementById("modal-close");
const modalBackdrop = document.getElementById("modal-backdrop");
const cartModalEl = document.getElementById("cart-modal");
const cartModalTitleEl = document.getElementById("cart-modal-title");
const cartModalDescriptionEl = document.getElementById("cart-modal-description");
const cartModalPriceEl = document.getElementById("cart-modal-price");
const cartModalTotalEl = document.getElementById("cart-modal-total");
const cartOrderNowEl = document.getElementById("cart-order-now");
const cartModalCloseBtn = document.getElementById("cart-modal-close");
const cartModalBackdrop = document.getElementById("cart-modal-backdrop");
const quantityValueEl = document.getElementById("quantity-value");
const quantityDecreaseBtn = document.getElementById("quantity-decrease");
const quantityIncreaseBtn = document.getElementById("quantity-increase");

const DISH_ART = {
  "Burgers": '<path d="M25 55c0-8 6-15 14-15h52c8 0 14 7 14 15v8H25v-8Z" fill="#e8b31c" stroke="#555" stroke-width="4"/><circle cx="65" cy="70" r="28" fill="#8b4513" stroke="#555" stroke-width="4"/><path d="M40 70h50" stroke="#c92836" stroke-width="3"/><circle cx="52" cy="75" r="3" fill="#fff"/><circle cx="65" cy="78" r="3" fill="#fff"/><circle cx="78" cy="75" r="3" fill="#fff"/><path d="M25 85c0 8 6 15 14 15h52c8 0 14-7 14-15H25Z" fill="#e8b31c" stroke="#555" stroke-width="4"/>',
  "Pizza": '<circle cx="65" cy="65" r="48" fill="#f5f5f3" stroke="#555" stroke-width="4"/><circle cx="65" cy="65" r="34" fill="#deded9"/><path d="M38 64c10-20 19-26 28-25 7 14 8 29 3 42-13 4-24-2-31-17Z" fill="#8c938c"/><path d="M69 45c13-12 26-8 33 4-5 12-12 20-24 25-8-7-11-17-9-29Z" fill="#b6b9b5"/><circle cx="54" cy="51" r="6" fill="#c92836"/><circle cx="79" cy="66" r="5" fill="#c92836"/><path d="M31 31 18 19m82 12 13-12M30 98 17 111" stroke="#555" stroke-width="4" stroke-linecap="round"/>',
  "Cakes and Desserts": '<path d="M28 82h74l-7 16H35l-7-16Z" fill="#bfc0bc" stroke="#555" stroke-width="4" stroke-linejoin="round"/><path d="m36 78 12-40h40l12 40H36Z" fill="#e6e4e0" stroke="#555" stroke-width="4" stroke-linejoin="round"/><path d="M49 38c0-10 9-18 19-18s19 8 19 18" fill="none" stroke="#777" stroke-width="5"/><path d="M43 57h50" stroke="#c92836" stroke-width="5"/><circle cx="68" cy="31" r="5" fill="#c92836"/>',
  "Other Foods": '<rect x="25" y="45" width="80" height="50" rx="8" fill="#e4e3df" stroke="#555" stroke-width="4"/><path d="M30 60h70M30 75h70" stroke="#888" stroke-width="3"/><circle cx="50" cy="52" r="4" fill="#8c938c"/><circle cx="80" cy="68" r="5" fill="#c92836"/><circle cx="45" cy="83" r="4" fill="#b6b9b5"/>',
  "Hot Drinks": '<path d="M29 35h62v24a31 31 0 0 1-31 31 31 31 0 0 1-31-31V35Z" fill="#e4e3df" stroke="#555" stroke-width="4"/><path d="M91 43h9a18 18 0 0 1 0 36h-9" fill="none" stroke="#555" stroke-width="5"/><path d="M45 27c-5-7 5-10 0-17m19 17c-5-7 5-10 0-17m19 17c-5-7 5-10 0-17" fill="none" stroke="#777" stroke-width="4" stroke-linecap="round"/><path d="M23 98h80" stroke="#555" stroke-width="5" stroke-linecap="round"/>',
  "Soft Drinks": '<path d="m35 31 12 69h36l12-69H35Z" fill="#e4e3df" stroke="#555" stroke-width="4" stroke-linejoin="round"/><path d="M41 62h48" stroke="#888" stroke-width="5"/><path d="m67 15-8 34m18-30-8 31" stroke="#555" stroke-width="4" stroke-linecap="round"/><circle cx="56" cy="73" r="7" fill="#c92836"/><circle cx="77" cy="83" r="6" fill="#b8b9b5"/>'
};

let lastTrigger = null;
let lastCartTrigger = null;
let selectedItem = null;
let selectedQuantity = 1;
const cart = new Map();

function formatPrice(value) {
  return value.toLocaleString("en-US") + " ETB";
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function itemsIn(categoryName) {
  return MENU.filter(item => item.category === categoryName);
}

function updateCart(message) {
  let count = 0;
  let total = 0;
  cart.forEach((quantity, id) => {
    const item = MENU.find(menuItem => menuItem.id === id);
    if (!item) return;
    count += quantity;
    total += item.price * quantity;
  });
  // Cart summary removed from UI, but cart data is maintained
}

function updateQuantity() {
  quantityValueEl.value = String(selectedQuantity);
  cartModalTotalEl.textContent = formatPrice(selectedItem.price * selectedQuantity);
  quantityDecreaseBtn.disabled = selectedQuantity <= 1;
}

function openCartModal(item, triggerButton) {
  selectedItem = item;
  selectedQuantity = 1;
  lastCartTrigger = triggerButton;
  cartModalTitleEl.textContent = item.name;
  cartModalDescriptionEl.textContent = item.description;
  cartModalPriceEl.textContent = formatPrice(item.price);
  updateQuantity();
  if (!modalEl.hidden) modalEl.hidden = true;
  cartModalEl.hidden = false;
  document.body.style.overflow = "hidden";
  cartModalCloseBtn.focus();
}

function closeCartModal() {
  cartModalEl.hidden = true;
  document.body.style.overflow = "";
  if (lastCartTrigger && lastCartTrigger.isConnected) lastCartTrigger.focus();
}

function confirmOrder() {
  const quantity = (cart.get(selectedItem.id) || 0) + selectedQuantity;
  cart.set(selectedItem.id, quantity);
  updateCart();
}

function buildCard(item, showCategory) {
  const card = el("article", "menu-card" + (item.available ? "" : " sold-out"));
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", "View details for " + item.name);

  if (item.image) {
    const image = el("img", "menu-card-image");
    image.src = item.image;
    image.alt = item.name;
    image.loading = "lazy";
    card.appendChild(image);
  } else {
    const art = el("span", "menu-card-art " + artClassFor(item));
    art.setAttribute("aria-hidden", "true");
    art.innerHTML = '<svg viewBox="0 0 130 130" aria-hidden="true"><circle cx="65" cy="65" r="58" fill="rgba(255,255,255,.42)"/>' + (DISH_ART[item.category] || DISH_ART.Food) + '</svg>';
    art.appendChild(el("span", "menu-art-label", item.category));
    card.appendChild(art);
  }

  const content = el("div", "menu-card-content");
  const heading = el("div", "menu-card-heading");
  heading.appendChild(el("h4", "menu-card-name", item.name));
  heading.appendChild(el("span", "menu-card-price", formatPrice(item.price)));
  content.appendChild(heading);
  content.appendChild(el("p", "menu-card-description", item.description));
  if (showCategory) content.appendChild(el("span", "menu-card-category", item.category));
  if (!item.available) content.appendChild(el("p", "item-status", "Not available today"));

  const actions = el("div", "menu-card-actions");
  const detailsButton = el("button", "btn btn-small", "Details");
  detailsButton.type = "button";
  detailsButton.setAttribute("aria-label", "View details for " + item.name);
  detailsButton.addEventListener("click", (e) => {
    e.stopPropagation();
    openModal(item, detailsButton);
  });
  const addButton = el("button", "btn btn-small btn-dark", "Add to cart");
  addButton.type = "button";
  addButton.disabled = !item.available;
  addButton.setAttribute("aria-label", "Add " + item.name + " to your order");
  addButton.addEventListener("click", (e) => {
    e.stopPropagation();
    openCartModal(item, addButton);
  });
  actions.append(detailsButton, addButton);
  content.appendChild(actions);
  card.appendChild(content);

  // Make entire card clickable to open modal
  card.addEventListener("click", () => openModal(item, card));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(item, card);
    }
  });

  return card;
}

function artClassFor(item) {
  return "menu-card-art-" + item.category.toLowerCase().replace(/\s+/g, "-");
}

function renderMenuCards(items, target, showCategory) {
  target.replaceChildren();
  if (items.length === 0) {
    target.appendChild(el("p", "empty", "No menu items match your search. Try another word."));
    return;
  }
  items.forEach(item => target.appendChild(buildCard(item, showCategory)));
}

function renderMenuLists() {
  menuListsEl.replaceChildren();
  CATEGORIES.forEach(category => {
    const section = el("section", "menu-list");
    section.id = category.id; // Add ID for smooth scrolling
    section.setAttribute("aria-labelledby", "menu-heading-" + category.id);
    const heading = el("h3", "page-title", category.name);
    heading.id = "menu-heading-" + category.id;
    const cards = el("div", "menu-cards");
    section.append(heading, cards);
    renderMenuCards(itemsIn(category.name), cards, false);
    menuListsEl.appendChild(section);
  });
}

function openModal(item, triggerButton) {
  lastTrigger = triggerButton;
  modalTitleEl.textContent = item.name;
  modalCategoryEl.textContent = item.category;
  modalPriceEl.textContent = formatPrice(item.price);
  modalDescriptionEl.textContent = item.description;
  modalStatusEl.hidden = item.available;
  modalAddEl.hidden = !item.available;
  modalAddEl.onclick = () => openCartModal(item, lastTrigger);
  modalBoxEl.style.borderTopColor = "var(--muted)";

  if (item.image) {
    modalImageEl.src = item.image;
    modalImageEl.alt = item.name;
    modalImageEl.hidden = false;
  } else {
    modalImageEl.removeAttribute("src");
    modalImageEl.alt = "";
    modalImageEl.hidden = true;
  }

  modalEl.hidden = false;
  document.body.style.overflow = "hidden";
  modalCloseBtn.focus();
}

function closeModal() {
  modalEl.hidden = true;
  document.body.style.overflow = "";
  if (lastTrigger && lastTrigger.isConnected) lastTrigger.focus();
}

modalCloseBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

quantityDecreaseBtn.addEventListener("click", () => {
  if (selectedQuantity > 1) {
    selectedQuantity -= 1;
    updateQuantity();
  }
});
quantityIncreaseBtn.addEventListener("click", () => {
  selectedQuantity += 1;
  updateQuantity();
});
cartOrderNowEl.addEventListener("click", confirmOrder);
cartModalCloseBtn.addEventListener("click", closeCartModal);
cartModalBackdrop.addEventListener("click", closeCartModal);

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  if (!cartModalEl.hidden) closeCartModal();
  else if (!modalEl.hidden) closeModal();
});

function renderSearch(query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    resultsView.hidden = true;
    categoriesView.hidden = false;
    return;
  }

  categoriesView.hidden = true;
  resultsView.hidden = false;
  const matches = MENU.filter(item =>
    item.name.toLowerCase().includes(normalizedQuery) ||
    item.description.toLowerCase().includes(normalizedQuery) ||
    item.category.toLowerCase().includes(normalizedQuery)
  );
  renderMenuCards(matches, resultsEl, true);
}

searchEl.addEventListener("input", () => renderSearch(searchEl.value));

renderMenuLists();
updateCart();


// Smooth scroll for category bar links
document.querySelectorAll('.category-item').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const headerHeight = document.getElementById('site-header')?.offsetHeight || 80;
      const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
