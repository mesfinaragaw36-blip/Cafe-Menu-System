// Menu data for Maya Cafe. Prices are in ETB.
// These are sample prices: replace them with your real ones.

// Each category has a tile color (bg, fg) and a modal accent color.
const CATEGORIES = [
  { name: "Hot Drinks",  bg: "#4A554E", fg: "#FFFFFF", accent: "#4A554E" },
  { name: "Cold Drinks", bg: "#B3263A", fg: "#FFFFFF", accent: "#B3263A" },
  { name: "Food",        bg: "#E8B31C", fg: "#1B1F1D", accent: "#E8B31C" },
  { name: "Desserts",    bg: "#DCE6DD", fg: "#4A554E", accent: "#4A554E" }
];

// To add an item, copy one line and change the values.
const MENU = [
  // Hot Drinks
  { id: 1,  name: "Coffee",           category: "Hot Drinks",  price: 40,  description: "Traditional Ethiopian coffee, brewed fresh.", available: true },
  { id: 2,  name: "Macchiato",        category: "Hot Drinks",  price: 60,  description: "Espresso with a spoonful of steamed milk.",   available: true },
  { id: 3,  name: "Cappuccino",       category: "Hot Drinks",  price: 80,  description: "Espresso, steamed milk and thick foam.",       available: true },
  { id: 4,  name: "Spris",            category: "Hot Drinks",  price: 50,  description: "Layered coffee and tea, a local favorite.",    available: true },
  { id: 5,  name: "Shai",             category: "Hot Drinks",  price: 30,  description: "Spiced black tea.",                            available: true },

  // Cold Drinks
  { id: 6,  name: "Iced Coffee",      category: "Cold Drinks", price: 90,  description: "Cold espresso over ice with milk.",            available: true },
  { id: 7,  name: "Avocado Juice",    category: "Cold Drinks", price: 110, description: "Thick avocado juice, layered with mango.",     available: true },
  { id: 8,  name: "Mango Juice",      category: "Cold Drinks", price: 100, description: "Fresh mango, no added sugar.",                 available: true },
  { id: 9,  name: "Bottled Water",    category: "Cold Drinks", price: 25,  description: "0.5 liter.",                                   available: true },

  // Food
  { id: 10, name: "Chechebsa",        category: "Food",        price: 150, description: "Pan-fried flatbread with spiced butter.",      available: true },
  { id: 11, name: "Ful",              category: "Food",        price: 120, description: "Fava beans with egg, bread on the side.",      available: true },
  { id: 12, name: "Club Sandwich",    category: "Food",        price: 180, description: "Chicken, egg, lettuce and tomato.",            available: true },
  { id: 13, name: "Pasta with Sauce", category: "Food",        price: 160, description: "Tomato sauce, finished with olive oil.",       available: false },

  // Desserts
  { id: 14, name: "Chocolate Cake",   category: "Desserts",    price: 95,  description: "A slice of dark chocolate cake.",              available: true },
  { id: 15, name: "Fruit Salad",      category: "Desserts",    price: 85,  description: "Seasonal fruit with honey.",                   available: true },
  { id: 16, name: "Cookies",          category: "Desserts",    price: 45,  description: "Two fresh-baked butter cookies.",              available: true }
];