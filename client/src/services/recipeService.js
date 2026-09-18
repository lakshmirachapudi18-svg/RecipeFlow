import axios from 'axios';

// Import fallback local recipes in case backend is loading/offline
const fallbackRecipes = [
  {
    _id: "rec_1",
    title: "Chicken Biryani",
    description: "Fragrant basmati rice layered with marinated chicken, aromatic spices, caramelised onions, and fresh mint.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop",
    category: "Non-Vegetarian",
    cuisine: "Indian",
    difficulty: "Hard",
    cookingTime: "60 mins",
    servings: 4,
    ingredients: [
      { name: "Basmati Rice", quantity: 500, unit: "g" },
      { name: "Chicken", quantity: 600, unit: "g" },
      { name: "Onions (sliced)", quantity: 3, unit: "medium" },
      { name: "Yogurt", quantity: 200, unit: "g" },
      { name: "Ginger Garlic Paste", quantity: 2, unit: "tbsp" },
      { name: "Biryani Masala", quantity: 2, unit: "tbsp" },
      { name: "Ghee", quantity: 3, unit: "tbsp" }
    ],
    instructions: [
      "Marinate chicken with yogurt, ginger garlic paste, biryani masala, and salt for 30 minutes.",
      "Parboil basmati rice with whole spices until 70% cooked; drain and set aside.",
      "Deep-fry sliced onions in ghee until golden brown and crispy.",
      "In a heavy-bottom pot, cook marinated chicken until half done, then layer parboiled rice on top.",
      "Garnish with fried onions, chopped mint, ghee, and saffron milk.",
      "Seal pot with lid and cook on low heat (dum) for 20 minutes before serving hot."
    ],
    tags: ["Biryani", "High Protein", "Popular"],
    isPopular: true,
    isQuick: false
  },
  {
    _id: "rec_2",
    title: "Butter Chicken",
    description: "Tender grilled chicken pieces simmered in a velvety, rich tomato, butter, and cream sauce.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1000&auto=format&fit=crop",
    category: "Non-Vegetarian",
    cuisine: "Indian",
    difficulty: "Medium",
    cookingTime: "40 mins",
    servings: 3,
    ingredients: [
      { name: "Boneless Chicken", quantity: 500, unit: "g" },
      { name: "Butter", quantity: 50, unit: "g" },
      { name: "Tomato Puree", quantity: 300, unit: "ml" },
      { name: "Fresh Cream", quantity: 100, unit: "ml" },
      { name: "Kasuri Methi", quantity: 1, unit: "tbsp" }
    ],
    instructions: [
      "Marinate chicken with spices and sear in a pan until browned.",
      "Melt butter and sauté garlic, then add tomato puree and simmer for 15 minutes.",
      "Blend gravy to smooth consistency, add chicken, and stir in fresh cream.",
      "Finish with Kasuri Methi and serve warm with naan."
    ],
    tags: ["Creamy", "Popular", "High Protein"],
    isPopular: true,
    isQuick: false
  },
  {
    _id: "rec_3",
    title: "Paneer Tikka",
    description: "Cubes of paneer and crunchy bell peppers marinated in spiced yogurt and grilled to perfection.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1000&auto=format&fit=crop",
    category: "Vegetarian",
    cuisine: "Indian",
    difficulty: "Medium",
    cookingTime: "30 mins",
    servings: 2,
    ingredients: [
      { name: "Paneer", quantity: 350, unit: "g" },
      { name: "Bell Peppers", quantity: 2, unit: "medium" },
      { name: "Hung Curd", quantity: 150, unit: "g" },
      { name: "Tikka Masala", quantity: 1.5, unit: "tbsp" }
    ],
    instructions: [
      "Whisk hung curd with spices and coat paneer and veggies.",
      "Rest in refrigerator for 20 minutes.",
      "Thread onto skewers and cook on hot pan until charred."
    ],
    tags: ["Vegetarian", "Starter", "High Protein"],
    isPopular: true,
    isQuick: true
  },
  {
    _id: "rec_4",
    title: "Vegetable Fried Rice",
    description: "Fluffy wok-tossed jasmine rice with crisp vegetables, soy sauce, and aromatic garlic.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1000&auto=format&fit=crop",
    category: "Vegetarian",
    cuisine: "Asian",
    difficulty: "Easy",
    cookingTime: "20 mins",
    servings: 2,
    ingredients: [
      { name: "Cooked Rice", quantity: 400, unit: "g" },
      { name: "Diced Carrots & Beans", quantity: 150, unit: "g" },
      { name: "Soy Sauce", quantity: 2, unit: "tbsp" },
      { name: "Garlic", quantity: 4, unit: "cloves" }
    ],
    instructions: [
      "Sauté garlic in sesame oil.",
      "Add diced vegetables and stir fry for 3 minutes on high flame.",
      "Add cooked rice and soy sauce; toss continuously for 2 minutes."
    ],
    tags: ["Asian", "Quick & Easy"],
    isPopular: false,
    isQuick: true
  },
  {
    _id: "rec_5",
    title: "Pasta Arrabbiata",
    description: "Penne pasta tossed in a fiery Italian tomato sauce infused with garlic, red chili flakes, and basil.",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281270?q=80&w=1000&auto=format&fit=crop",
    category: "Vegetarian",
    cuisine: "Italian",
    difficulty: "Easy",
    cookingTime: "25 mins",
    servings: 2,
    ingredients: [
      { name: "Penne Pasta", quantity: 250, unit: "g" },
      { name: "Crushed Tomatoes", quantity: 400, unit: "g" },
      { name: "Garlic", quantity: 5, unit: "cloves" },
      { name: "Red Chili Flakes", quantity: 1, unit: "tsp" }
    ],
    instructions: [
      "Boil penne pasta al dente.",
      "Sauté sliced garlic and chili flakes in olive oil.",
      "Pour crushed tomatoes and simmer sauce for 12 minutes before tossing with pasta."
    ],
    tags: ["Italian", "Pasta", "Spicy"],
    isPopular: true,
    isQuick: true
  },
  {
    _id: "rec_6",
    title: "Masala Dosa",
    description: "Crisp golden crepe made from fermented rice-lentil batter filled with spiced potato masala.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1000&auto=format&fit=crop",
    category: "Vegetarian",
    cuisine: "South Indian",
    difficulty: "Medium",
    cookingTime: "30 mins",
    servings: 2,
    ingredients: [
      { name: "Dosa Batter", quantity: 500, unit: "ml" },
      { name: "Boiled Potatoes", quantity: 3, unit: "medium" },
      { name: "Mustard Seeds & Curry Leaves", quantity: 1, unit: "tbsp" }
    ],
    instructions: [
      "Make potato masala with tempered spices and onions.",
      "Pour dosa batter on hot tawa and spread thin.",
      "Place filling in center, fold and serve with chutney."
    ],
    tags: ["South Indian", "Breakfast"],
    isPopular: true,
    isQuick: false
  }
];

export const fetchRecipes = async (params = {}) => {
  try {
    const res = await axios.get('/api/recipes', { params });
    if (res.data && res.data.data) {
      return res.data.data;
    }
    return fallbackRecipes;
  } catch (error) {
    console.warn('Backend API unavailable. Using fallback local recipe dataset.');
    let filtered = [...fallbackRecipes];
    if (params.q) {
      const q = params.q.toLowerCase();
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(q))
      );
    }
    if (params.category && params.category !== 'All') {
      if (params.category === 'Vegetarian') {
        filtered = filtered.filter(r => r.category === 'Vegetarian');
      } else if (params.category === 'Non-Vegetarian') {
        filtered = filtered.filter(r => r.category === 'Non-Vegetarian');
      }
    }
    return filtered;
  }
};

export const fetchRecipeById = async (id) => {
  try {
    const res = await axios.get(`/api/recipes/${id}`);
    if (res.data && res.data.data) {
      return res.data.data;
    }
  } catch (error) {
    console.warn('Backend API lookup failed, checking local dataset.');
  }

  const found = fallbackRecipes.find(r => r._id === id || String(r._id) === String(id));
  return found || fallbackRecipes[0];
};
