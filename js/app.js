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
const modalOrderEl = document.getElementById("modal-order");
const modalCloseBtn = document.getElementById("modal-close");
const modalBackdrop = document.getElementById("modal-backdrop");

const DISH_SVG =
  '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" ' +
  'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M8 25h32a16 16 0 0 1-32 0Z"/><path d="M5 25h38M16 14c-2-3 2-4 0-7m8 7c-2-3 2-4 0-7m8 7c-2-3 2-4 0-7"/></svg>';

let lastTrigger = null;

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

function buildCard(item, showCategory) {
  const card = el("button", "menu-card" + (item.available ? "" : " sold-out"));
  card.type = "button";
  card.setAttribute("aria-label", "View " + item.name + ", " + formatPrice(item.price));

  if (item.image) {
    const image = el("img", "menu-card-image");
    image.src = item.image;
    image.alt = item.name;
    image.loading = "lazy";
    card.appendChild(image);
  } else {
    const art = el("span", "menu-card-art");
    art.innerHTML = DISH_SVG;
    card.appendChild(art);
  }

  const content = el("span", "menu-card-content");
  const heading = el("span", "menu-card-heading");
  heading.appendChild(el("span", "menu-card-name", item.name));
  heading.appendChild(el("span", "menu-card-price", formatPrice(item.price)));
  content.appendChild(heading);
  content.appendChild(el("span", "menu-card-description", item.description));
  if (showCategory) content.appendChild(el("span", "menu-card-category", item.category));
  if (!item.available) content.appendChild(el("span", "item-status", "Not available today"));
  card.appendChild(content);

  card.addEventListener("click", () => openModal(item, card));
  return card;
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
    section.setAttribute("aria-labelledby", "menu-heading-" + category.name.toLowerCase().replace(/\s+/g, "-"));
    const heading = el("h3", "page-title", category.name);
    heading.id = "menu-heading-" + category.name.toLowerCase().replace(/\s+/g, "-");
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
  modalOrderEl.hidden = !item.available;
  modalBoxEl.style.borderTopColor = CATEGORIES.find(category => category.name === item.category).accent;

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
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modalEl.hidden) closeModal();
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
