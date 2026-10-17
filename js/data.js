
// Each category has a tile color (bg, fg) and a modal accent color.
const CATEGORIES = [
  { name: "Burgers",            bg: "#E8B31C", fg: "#1B1F1D", accent: "#5BA548", id: "burgers" },
  { name: "Pizza",              bg: "#E8B31C", fg: "#1B1F1D", accent: "#5BA548", id: "pizza" },
  { name: "Cakes and Desserts", bg: "#DCE6DD", fg: "#4A554E", accent: "#5BA548", id: "cakes-desserts" },
  { name: "Other Foods",        bg: "#E8B31C", fg: "#1B1F1D", accent: "#5BA548", id: "other-foods" },
  { name: "Soft Drinks",        bg: "#DCE6DD", fg: "#4A554E", accent: "#5BA548", id: "soft-drinks" },
  { name: "Hot Drinks",         bg: "#4A554E", fg: "#FFFFFF", accent: "#5BA548", id: "hot-drinks" },
  { name: "Juices",             bg: "#DCE6DD", fg: "#4A554E", accent: "#5BA548", id: "juices" }
];

// To add an item, copy one line and change the values.
const MENU = [
  // Burgers
  { id: 1, name: "Beef Burger",        category: "Burgers", price: 180, description: "Beef burger with vegetables and sauce in soft bun.", image: "image/beef-burger.jpg", available: true },
  { id: 2, name: "Chicken Burger",     category: "Burgers", price: 150, description: "Chicken burger with vegetables and sauce in soft bun.", image: "image/chicken-burger.jpg", available: true },
  { id: 3, name: "Cheese Burger",      category: "Burgers", price: 200, description: "Beef burger with melted cheese and vegetables.", image: "image/cheese-burger.jpg", available: true },
  { id: 4, name: "Special Burger",     category: "Burgers", price: 220, description: "Our best burger with extra toppings and cheese.", image: "image/special-burger.jpg", available: true },

  // Pizza
  { id: 5, name: "Cheese Pizza",       category: "Pizza", price: 250, description: "Pizza with cheese and tomato sauce.", image: "image/cheese-pizza.jpg", available: true },
  { id: 6, name: "Vegetable Pizza",    category: "Pizza", price: 280, description: "Pizza with fresh vegetables and cheese.", image: "image/vegetable-pizza.jpg", available: true },
  { id: 7, name: "Chicken Pizza",      category: "Pizza", price: 320, description: "Pizza with chicken, cheese, and vegetables.", image: "image/chicken-pizza.jpg", available: true },
  { id: 8, name: "Special Pizza",      category: "Pizza", price: 350, description: "Our best pizza with chicken, beef, and vegetables.", image: "image/special-pizza.jpg", available: true },

  // Cakes and Desserts
  { id: 9,  name: "Chocolate Cake",    category: "Cakes and Desserts", price: 120, description: "Soft cake with chocolate flavor.", image: "image/chocolate-cake.jpg", available: true },
  { id: 10, name: "Black Forest Cake", category: "Cakes and Desserts", price: 140, description: "Chocolate cake with cream and cherry.", image: "image/black-forest-cake.jpg", available: true },
  { id: 11, name: "Cheesecake",        category: "Cakes and Desserts", price: 150, description: "Creamy cake with biscuit base.", image: "image/cheesecake.jpg", available: true },
  { id: 12, name: "Cupcake",           category: "Cakes and Desserts", price: 50,  description: "Small soft cake with sweet topping.", image: "image/cupcake.jpg", available: true },
  { id: 23, name: "Donut",             category: "Cakes and Desserts", price: 70,  description: "Soft sweet donut with glaze.", image: "image/donut.jpg", available: true },
  
  // Other Foods
  { id: 13, name: "Club Sandwich",     category: "Other Foods", price: 140, description: "Sandwich with chicken, egg, and vegetables.", image: "image/club-sandwich.jpg", available: true },
  { id: 14, name: "French Fries",      category: "Other Foods", price: 60,  description: "Crispy fried potatoes.", image: "image/french-fries.jpg", available: true },
  { id: 15, name: "Chicken Sandwich",  category: "Other Foods", price: 120, description: "Sandwich with chicken and vegetables.", image: "image/chicken-sandwich.jpg", available: true },
  { id: 16, name: "Beef Sandwich",     category: "Other Foods", price: 130, description: "Sandwich with beef and vegetables.", image: "image/beef-sandwich.jpg", available: true },
  { id: 17, name: "Egg Sandwich",      category: "Other Foods", price: 130, description: "Sandwich with egg and vegetables.", image: "image/egg-sandwich.jpg", available: true },
  
  // Soft Drinks
  { id: 29, name: "Sprite",            category: "Soft Drinks", price: 30, description: "Cold lemon soft drink.", image: "image/sprite.jpg", available: true },
  { id: 30, name: "Coca-Cola",         category: "Soft Drinks", price: 30, description: "Cold cola drink.", image: "image/coca-cola.jpg", available: true },
  { id: 31, name: "Fanta",             category: "Soft Drinks", price: 30, description: "Cold orange soft drink.", image: "image/fanta.jpg", available: true },
  { id: 32, name: "Mirinda",           category: "Soft Drinks", price: 30, description: "Cold orange soft drink.", image: "image/mirinda.jpg", available: true },
  { id: 33, name: "1 L Water",         category: "Soft Drinks", price: 50, description: "Bottled water, 1 liter.", image: "image/water-1l.jpg", available: true },
  { id: 34, name: "0.5 L Water",       category: "Soft Drinks", price: 30, description: "Bottled water, half liter.", image: "image/water-05l.jpg", available: true },
  
  // Hot Drinks
  { id: 18, name: "Ethiopian Coffee",  category: "Hot Drinks", price: 40, description: "Traditional Ethiopian coffee.", image: "image/ethiopian-coffee.jpg", available: true },
  { id: 19, name: "Macchiato",         category: "Hot Drinks", price: 60, description: "Strong coffee with milk.", image: "image/macchiato.jpg", available: true },
  { id: 20, name: "Hot Chocolate",     category: "Hot Drinks", price: 70, description: "Hot sweet chocolate drink.", image: "image/hot-chocolate.jpg", available: true },
  { id: 21, name: "Spris",             category: "Hot Drinks", price: 50, description: "Coffee with tea, Ethiopian style.", image: "image/spris.jpg", available: true },
  { id: 22, name: "Tea",               category: "Hot Drinks", price: 25, description: "Hot tea.", image: "image/tea.jpg", available: true },
  { id: 24, name: "Milk Coffee",       category: "Hot Drinks", price: 45, description: "Coffee with milk.", image: "image/milk-coffee.jpg", available: true },

  // juice
  { id: 35, name: "Orange Juice",      category: "Juices", price: 40, description: "Freshly squeezed orange juice.", image: "image/orange-juice.jpg", available: true },
  { id: 36, name: "Apple Juice",       category: "Juices", price: 40, description: "Freshly squeezed apple juice.", image: "image/apple-juice.jpg", available: true },
  {id: 38, name: "Mango Juice",       category: "Juices", price: 40, description: "Freshly squeezed mango juice.", image: "image/mango-juice.jpg", available: true },
  {id: 39, name: "Avocado Juice",   category: "Juices", price: 40, description: "Freshly squeezed avocado juice.", image: "image/avocado-juice.jpg", available: true }
];