const sampleRecipes = [
  {
    _id: "rec_1",
    title: "Chicken Biryani",
    slug: "chicken-biryani",
    description: "Authentic Hyderabadi dum biryani featuring fragrant basmati rice layered with juicy marinated chicken, caramelised fried onions, ghee, mint, and saffron.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop",
    category: "Non-Vegetarian",
    cuisine: "Indian",
    difficulty: "Hard",
    cookingTime: "60 mins",
    prepTime: "30 mins",
    cookTime: "45 mins",
    totalTime: "75 mins",
    servings: 4,
    ingredientSections: [
      {
        sectionTitle: "For the Rice",
        ingredients: [
          { name: "Basmati Rice (aged)", quantity: 2, unit: "cups" },
          { name: "Water", quantity: 8, unit: "cups" },
          { name: "Bay Leaves", quantity: 2, unit: "pcs" },
          { name: "Green Cardamom", quantity: 4, unit: "pcs" },
          { name: "Cloves", quantity: 5, unit: "pcs" },
          { name: "Cinnamon Stick", quantity: 1, unit: "pc" },
          { name: "Star Anise", quantity: 1, unit: "pc" },
          { name: "Shahi Jeera (Cumin Seeds)", quantity: 1, unit: "tsp" },
          { name: "Salt", quantity: 2, unit: "tbsp" }
        ]
      },
      {
        sectionTitle: "For the Chicken Marinade & Curry",
        ingredients: [
          { name: "Bone-in Chicken (large cuts)", quantity: 1, unit: "kg" },
          { name: "Hung Curd", quantity: 0.75, unit: "cup" },
          { name: "Ginger-Garlic Paste", quantity: 2, unit: "tbsp" },
          { name: "Lemon Juice", quantity: 2, unit: "tbsp" },
          { name: "Kashmiri Red Chili Powder", quantity: 1, unit: "tbsp" },
          { name: "Turmeric Powder", quantity: 0.5, unit: "tsp" },
          { name: "Biryani Masala", quantity: 2.5, unit: "tsp" },
          { name: "Mint Leaves (chopped)", quantity: 0.25, unit: "cup" },
          { name: "Coriander Leaves (chopped)", quantity: 0.25, unit: "cup" },
          { name: "Onions (thinly sliced)", quantity: 4, unit: "medium" },
          { name: "Tomatoes (chopped)", quantity: 2, unit: "medium" },
          { name: "Green Chilies (slit)", quantity: 4, unit: "pcs" },
          { name: "Cooking Oil", quantity: 4, unit: "tbsp" }
        ]
      },
      {
        sectionTitle: "For Layering & Garnish",
        ingredients: [
          { name: "Saffron Threads", quantity: 1, unit: "pinch" },
          { name: "Warm Milk", quantity: 4, unit: "tbsp" },
          { name: "Crispy Fried Onions (Birista)", quantity: 0.5, unit: "cup" },
          { name: "Fresh Mint Leaves", quantity: 0.25, unit: "cup" },
          { name: "Fresh Coriander Leaves", quantity: 0.25, unit: "cup" },
          { name: "Desi Ghee", quantity: 2, unit: "tbsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Basmati Rice", quantity: 2, unit: "cups" },
      { name: "Bone-in Chicken", quantity: 1, unit: "kg" },
      { name: "Hung Curd", quantity: 0.75, unit: "cup" },
      { name: "Onions", quantity: 4, unit: "medium" },
      { name: "Ginger-Garlic Paste", quantity: 2, unit: "tbsp" },
      { name: "Desi Ghee", quantity: 6, unit: "tbsp" },
      { name: "Biryani Masala", quantity: 2.5, unit: "tsp" },
      { name: "Saffron Threads", quantity: 1, unit: "pinch" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Fry the Onions (Birista)",
        description: "Crispy caramelized fried onions provide the foundational sweetness and rich flavor aroma of biryani.",
        actions: [
          "Heat 4 tablespoons of oil or ghee in a heavy-bottomed pot over medium heat.",
          "Add 4 thinly sliced onions and stir frequently.",
          "Continue frying for 12–15 minutes until deep golden brown.",
          "Remove fried onions with a slotted spoon onto paper towels and allow them to crisp."
        ],
        time: "15 minutes",
        heat: "Medium heat",
        donenessCue: "Onions should be golden brown and crisp without turning black or bitter."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Marinate the Chicken",
        description: "Marinating softens the chicken fibers and infuses deep spice flavor into the meat.",
        actions: [
          "In a large bowl, combine chicken pieces with yogurt, ginger-garlic paste, lemon juice, chili powder, turmeric, and biryani masala.",
          "Add half of the fried onions, chopped mint, coriander, and green chilies.",
          "Mix thoroughly to coat all chicken pieces.",
          "Cover and refrigerate for at least 45 minutes."
        ],
        time: "45 minutes",
        heat: "Chill (Refrigerator)",
        donenessCue: "Chicken should be thoroughly coated and marinade absorbed."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Parboil the Fragrant Basmati Rice",
        description: "Parboiling ensures long grains cook perfectly during steam dum without getting mushy.",
        actions: [
          "Rinse 2 cups basmati rice until water runs clear; soak for 30 minutes.",
          "In a large pot, bring 8 cups water to a rolling boil with whole spices and 2 tbsp salt.",
          "Add soaked rice and cook for 5–6 minutes until 70% cooked.",
          "Drain rice in a colander, reserving 1/2 cup of hot rice water."
        ],
        time: "10 minutes",
        heat: "High boil",
        donenessCue: "Rice grains should be firm with a slight bite in the center."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Cook the Chicken Base (Yakhni)",
        description: "Searing the chicken creates a rich gravy base for layering.",
        actions: [
          "Heat 2 tbsp ghee in your biryani pot, add chopped tomatoes and slit green chilies.",
          "Add marinated chicken along with all marinade juices.",
          "Cook over medium-high heat for 10 minutes until chicken is half-cooked and gravy thickens."
        ],
        time: "10 minutes",
        heat: "Medium-high heat",
        donenessCue: "Oil specks should appear around the edges of thick chicken gravy."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Layer the Biryani (Dum Assembly)",
        description: "Layering rice and chicken traps the fragrant steam inside.",
        actions: [
          "Spread the half-cooked chicken evenly across the bottom of the pot.",
          "Top with the parboiled basmati rice in an even layer.",
          "Drizzle saffron-infused milk, melted ghee, fried onions, and fresh mint leaves over the rice."
        ],
        time: "5 minutes",
        heat: "Off heat (Assembly)",
        donenessCue: "Even layers with saffron milk drizzled on top."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Dum Steam Cooking & Resting",
        description: "Slow steam cooking infuses all flavors together.",
        actions: [
          "Seal pot with aluminum foil or tight lid. Place pot over a hot iron tawa on low flame.",
          "Cook on Dum for 20 minutes.",
          "Turn off heat and let rest undisturbed for 15 minutes before opening.",
          "Gently fluff layers with a flat spoon and serve piping hot."
        ],
        time: "35 minutes total",
        heat: "Low heat (Dum tawa)",
        donenessCue: "Fragrant steam releases when unsealed; rice grains stand fluffily separate."
      }
    ],
    tips: [
      "Always soak aged Basmati rice for at least 30 minutes for maximum grain length.",
      "Do not skip resting the biryani pot after cooking; this prevents grains from breaking."
    ],
    servingSuggestions: ["Serve with chilled Cucumber Pomegranate Raita, sliced red onions, and mint chutney."],
    storage: ["Store leftover biryani in an airtight container in the fridge for up to 3 days."],
    tags: ["Biryani", "High Protein", "Popular", "Indian"],
    isPopular: true,
    isQuick: false,
    isHighProtein: true
  },
  {
    _id: "rec_2",
    title: "Butter Chicken",
    slug: "butter-chicken",
    description: "Tender grilled chicken pieces simmered in a silky, rich sauce crafted from vine-ripened tomatoes, butter, heavy cream, garlic, and dried fenugreek leaves.",
    image: "/images/recipes/butter-chicken.jpg",
    category: "Non-Vegetarian",
    cuisine: "Indian",
    difficulty: "Medium",
    cookingTime: "40 mins",
    prepTime: "20 mins",
    cookTime: "30 mins",
    totalTime: "50 mins",
    servings: 3,
    ingredientSections: [
      {
        sectionTitle: "For the Chicken Marinade",
        ingredients: [
          { name: "Boneless Chicken Thighs (cubed)", quantity: 600, unit: "g" },
          { name: "Yogurt", quantity: 0.5, unit: "cup" },
          { name: "Ginger-Garlic Paste", quantity: 1.5, unit: "tbsp" },
          { name: "Kashmiri Red Chili Powder", quantity: 1, unit: "tbsp" },
          { name: "Garam Masala", quantity: 1, unit: "tsp" },
          { name: "Lemon Juice", quantity: 1, unit: "tbsp" },
          { name: "Mustard Oil", quantity: 1, unit: "tbsp" },
          { name: "Salt", quantity: 1, unit: "tsp" }
        ]
      },
      {
        sectionTitle: "For the Makhani Velvet Gravy",
        ingredients: [
          { name: "Unsalted Butter", quantity: 60, unit: "g" },
          { name: "Tomato Puree", quantity: 400, unit: "g" },
          { name: "Heavy Cream", quantity: 120, unit: "ml" },
          { name: "Minced Garlic", quantity: 6, unit: "cloves" },
          { name: "Julienned Ginger", quantity: 1, unit: "inch" },
          { name: "Kasuri Methi (Dried Fenugreek)", quantity: 1.5, unit: "tbsp" },
          { name: "Honey", quantity: 1, unit: "tsp" },
          { name: "Soaked Cashews", quantity: 12, unit: "pcs" },
          { name: "Green Cardamom Powder", quantity: 0.5, unit: "tsp" },
          { name: "Cooking Oil", quantity: 1, unit: "tbsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Boneless Chicken Thighs", quantity: 600, unit: "g" },
      { name: "Unsalted Butter", quantity: 60, unit: "g" },
      { name: "Tomato Puree", quantity: 400, unit: "g" },
      { name: "Heavy Cream", quantity: 120, unit: "ml" },
      { name: "Soaked Cashews", quantity: 12, unit: "pcs" },
      { name: "Kasuri Methi", quantity: 1.5, unit: "tbsp" },
      { name: "Ginger-Garlic Paste", quantity: 1.5, unit: "tbsp" },
      { name: "Kashmiri Red Chili Powder", quantity: 1, unit: "tbsp" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Marinate the Chicken",
        description: "Marinating in seasoned yogurt tenderizes the chicken and allows Kashmiri chili color and spice to penetrate.",
        actions: [
          "In a bowl, whisk yogurt, ginger-garlic paste, Kashmiri chili powder, garam masala, lemon juice, salt, and mustard oil.",
          "Add cubed boneless chicken thighs and mix thoroughly.",
          "Cover and marinate in the refrigerator for at least 30 minutes."
        ],
        time: "30 minutes",
        heat: "Chill (Refrigerator)",
        donenessCue: "Chicken should be evenly coated in marinade with a rich red hue."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Sear the Chicken (Tandoori Char)",
        description: "High heat searing creates charred edges that replicate authentic tandoor cooking.",
        actions: [
          "Heat 1 tablespoon of cooking oil in a heavy skillet or grill pan over high flame.",
          "Add marinated chicken in a single layer without overcrowding.",
          "Sear for 6–8 minutes, flipping halfway, until browned with light black charred spots.",
          "Remove chicken onto a plate and set aside."
        ],
        time: "8 minutes",
        heat: "High heat",
        donenessCue: "Edges should be lightly charred and chicken cooked to 90% doneness."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Simmer Tomato & Cashew Base",
        description: "Simmering ripe tomato puree and soaked cashews creates the sweet, velvety foundation for Makhani gravy.",
        actions: [
          "In a saucepan, add tomato puree, soaked cashews, minced garlic, green cardamom powder, and 1/2 cup water.",
          "Cover and simmer over medium heat for 12–15 minutes until tomatoes collapse completely."
        ],
        time: "15 minutes",
        heat: "Medium heat",
        donenessCue: "Tomatoes should be completely soft and cashews tender."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Blend and Strain Sauce",
        description: "Blending and straining gives Butter Chicken its iconic silk-smooth restaurant texture.",
        actions: [
          "Allow the tomato-cashew mixture to cool slightly.",
          "Transfer to a high-speed blender and process until smooth.",
          "Pass the sauce through a fine-mesh sieve into a bowl, discarding any seeds or coarse skin."
        ],
        time: "5 minutes",
        heat: "No heat",
        donenessCue: "Strained puree should be glossy, homogenous, and velvety smooth."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Build the Butter Makhani Gravy",
        description: "Tempering ginger juliennes in butter infuses warmth into the velvety gravy.",
        actions: [
          "Melt 40g unsalted butter in a deep skillet over low-medium heat.",
          "Add julienned ginger and stir for 30 seconds until fragrant.",
          "Pour in the strained tomato-cashew puree and stir thoroughly.",
          "Add Kashmiri chili powder, salt, and honey; simmer gently for 8–10 minutes."
        ],
        time: "10 minutes",
        heat: "Low-medium heat",
        donenessCue: "Butter droplets should begin separating at the edges of the rich gravy."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Combine Chicken & Simmer",
        description: "Allows the seared chicken to absorb the rich buttery gravy flavors.",
        actions: [
          "Add seared chicken cubes and any accumulated pan juices into the simmering gravy.",
          "Stir well, cover pan, and simmer over low heat for 5 minutes until chicken is tender."
        ],
        time: "5 minutes",
        heat: "Low heat",
        donenessCue: "Chicken should be tender and fully cooked through."
      },
      {
        step: 7,
        stepNumber: 7,
        title: "Finish with Kasuri Methi & Cream",
        description: "Kasuri methi and heavy cream provide the signature aroma and rich finish.",
        actions: [
          "Crush dried Kasuri Methi between your palms and sprinkle over the gravy.",
          "Pour in fresh heavy cream and remaining 20g butter, then stir gently.",
          "Simmer for 1–2 minutes on low heat, then remove from flame.",
          "Garnish with a swirl of cream and serve hot."
        ],
        time: "3 minutes",
        heat: "Low heat",
        donenessCue: "Gravy coats the back of a spoon with a silky, rich consistency."
      }
    ],
    tips: [
      "Crushing Kasuri Methi between warm palms releases its essential aromatic oils.",
      "Straining the tomato cashew puree through a sieve is essential for true restaurant silkiness."
    ],
    servingSuggestions: ["Serve hot with garlic butter naan, roti, or fragrant jeera rice."],
    storage: ["Refrigerate in an airtight container for up to 4 days."],
    tags: ["North Indian", "Creamy", "Popular", "High Protein"],
    isPopular: true,
    isQuick: false,
    isHighProtein: true
  },
  {
    _id: "rec_3",
    title: "Paneer Tikka",
    slug: "paneer-tikka",
    description: "Juicy cubes of fresh cottage cheese, vibrant bell peppers, and onion petals marinated in spiced mustard oil yogurt and baked or grilled until blistered.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1200&auto=format&fit=crop",
    category: "Vegetarian",
    cuisine: "Indian",
    difficulty: "Medium",
    cookingTime: "30 mins",
    prepTime: "20 mins",
    cookTime: "15 mins",
    totalTime: "35 mins",
    servings: 2,
    ingredientSections: [
      {
        sectionTitle: "For the Veggie & Paneer Cubes",
        ingredients: [
          { name: "Firm Paneer", quantity: 400, unit: "g" },
          { name: "Red Bell Pepper", quantity: 1, unit: "medium" },
          { name: "Green Bell Pepper", quantity: 1, unit: "medium" },
          { name: "Onion", quantity: 1, unit: "large" }
        ]
      },
      {
        sectionTitle: "For the Mustard Oil Marinade",
        ingredients: [
          { name: "Hung Curd", quantity: 0.75, unit: "cup" },
          { name: "Mustard Oil", quantity: 2, unit: "tbsp" },
          { name: "Roasted Besan (Gram Flour)", quantity: 1, unit: "tbsp" },
          { name: "Ginger-Garlic Paste", quantity: 1, unit: "tbsp" },
          { name: "Kashmiri Red Chili Powder", quantity: 1, unit: "tbsp" },
          { name: "Chaat Masala", quantity: 1, unit: "tsp" },
          { name: "Ajwain (Carom Seeds)", quantity: 0.5, unit: "tsp" },
          { name: "Lemon Juice", quantity: 1, unit: "tbsp" },
          { name: "Salt", quantity: 1, unit: "tsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Firm Paneer", quantity: 400, unit: "g" },
      { name: "Red Bell Pepper", quantity: 1, unit: "medium" },
      { name: "Green Bell Pepper", quantity: 1, unit: "medium" },
      { name: "Onion", quantity: 1, unit: "large" },
      { name: "Hung Curd", quantity: 0.75, unit: "cup" },
      { name: "Mustard Oil", quantity: 2, unit: "tbsp" },
      { name: "Roasted Besan", quantity: 1, unit: "tbsp" },
      { name: "Chaat Masala", quantity: 1, unit: "tsp" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Prep Veggies and Paneer",
        description: "Cutting paneer and vegetables into uniform 1.5-inch squares ensures even grilling.",
        actions: [
          "Cut firm paneer into 1.5-inch thick cubes.",
          "Deseed bell peppers and cut into matching 1.5-inch squares.",
          "Cut onion into quarters and separate layers into distinct petals."
        ],
        time: "10 minutes",
        heat: "No heat",
        donenessCue: "Paneer and vegetables cut into uniform bite-sized squares."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Prepare Mustard Oil Marinade Base",
        description: "Heating mustard oil until smoking removes raw pungency and adds authentic dhaba aroma.",
        actions: [
          "Heat 2 tablespoons of mustard oil in a small pan until it reaches smoking point.",
          "Turn off flame, stir in Kashmiri chili powder, and allow oil to cool slightly.",
          "In a large bowl, whisk hung curd, warm chili mustard oil, roasted besan, ginger-garlic paste, crushed ajwain, chaat masala, salt, and lemon juice."
        ],
        time: "5 minutes",
        heat: "Medium heat (Oil heating)",
        donenessCue: "Marinade should be thick, glossy, orange-red, and fragrant."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Coat and Marinate Paneer & Veggies",
        description: "Thick hung curd marinade clings to paneer and vegetables during roasting.",
        actions: [
          "Add paneer cubes, bell peppers, and onion petals to the marinade bowl.",
          "Gently coat every piece thoroughly using your hands or a spatula.",
          "Cover and refrigerate for 25–30 minutes."
        ],
        time: "25 minutes",
        heat: "Chill (Refrigerator)",
        donenessCue: "All paneer and vegetable pieces heavily coated in marinade."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Thread Skewers",
        description: "Alternating paneer and colorful vegetables creates visual appeal and balanced cooking.",
        actions: [
          "If using wooden skewers, soak them in water for 20 minutes beforehand.",
          "Thread onion, green pepper, paneer cube, red pepper alternately onto each skewer."
        ],
        time: "5 minutes",
        heat: "Assembly",
        donenessCue: "Skewers neatly packed with alternating paneer and colorful veggies."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Grill or Bake to Blistered Perfection",
        description: "High heat chars edges while keeping paneer moist inside.",
        actions: [
          "Preheat oven or grill to 220°C (425°F).",
          "Place skewers on a foil-lined baking tray and baste lightly with oil.",
          "Bake or grill for 12–15 minutes, turning once halfway through.",
          "Baste again with oil during turning."
        ],
        time: "15 minutes",
        heat: "220°C High Grill",
        donenessCue: "Edges of paneer and peppers should be lightly charred and golden."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Finish & Serve",
        description: "Tangy chaat masala and fresh lemon juice highlight charred flavors.",
        actions: [
          "Transfer hot skewers to a platter.",
          "Generously sprinkle chaat masala and squeeze fresh lemon juice on top.",
          "Serve piping hot."
        ],
        time: "2 minutes",
        heat: "Off heat",
        donenessCue: "Smokey, juicy, charred paneer tikka ready to eat."
      }
    ],
    tips: [
      "Ensure hung curd is drained of all whey so the marinade clings to paneer without dripping.",
      "Do not overcook paneer in the oven or it will become chewy."
    ],
    servingSuggestions: ["Serve hot with fresh mint coriander chutney, onion rings, and lemon wedges."],
    storage: ["Best enjoyed fresh immediately after grilling."],
    tags: ["Vegetarian", "Starter", "Grilled", "High Protein"],
    isPopular: true,
    isQuick: true,
    isHighProtein: true
  },
  {
    _id: "rec_4",
    title: "Palak Paneer",
    slug: "palak-paneer",
    description: "Soft cottage cheese cubes simmered in a vibrant emerald green spinach sauce spiced with garlic, ginger, cumin, and fresh cream.",
    image: "/images/recipes/palak-paneer.jpg",
    category: "Vegetarian",
    cuisine: "Indian",
    difficulty: "Medium",
    cookingTime: "35 mins",
    prepTime: "15 mins",
    cookTime: "20 mins",
    totalTime: "35 mins",
    servings: 3,
    ingredientSections: [
      {
        sectionTitle: "For Blanching Spinach",
        ingredients: [
          { name: "Fresh Spinach (Palak)", quantity: 400, unit: "g" },
          { name: "Water", quantity: 6, unit: "cups" },
          { name: "Ice Cubes", quantity: 2, unit: "cups" }
        ]
      },
      {
        sectionTitle: "For the Gravy & Paneer",
        ingredients: [
          { name: "Paneer Cubes", quantity: 350, unit: "g" },
          { name: "Onion (chopped)", quantity: 1, unit: "medium" },
          { name: "Tomatoes (chopped)", quantity: 2, unit: "medium" },
          { name: "Minced Garlic", quantity: 6, unit: "cloves" },
          { name: "Ginger Paste", quantity: 1, unit: "tbsp" },
          { name: "Green Chili", quantity: 1, unit: "pc" },
          { name: "Desi Ghee", quantity: 2, unit: "tbsp" },
          { name: "Cumin Seeds", quantity: 1, unit: "tsp" },
          { name: "Turmeric Powder", quantity: 0.25, unit: "tsp" },
          { name: "Garam Masala", quantity: 1, unit: "tsp" },
          { name: "Salt", quantity: 1, unit: "tsp" },
          { name: "Fresh Cream", quantity: 3, unit: "tbsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Fresh Spinach", quantity: 400, unit: "g" },
      { name: "Paneer Cubes", quantity: 350, unit: "g" },
      { name: "Desi Ghee", quantity: 2, unit: "tbsp" },
      { name: "Fresh Cream", quantity: 3, unit: "tbsp" },
      { name: "Minced Garlic", quantity: 6, unit: "cloves" },
      { name: "Tomatoes", quantity: 2, unit: "medium" },
      { name: "Cumin Seeds", quantity: 1, unit: "tsp" },
      { name: "Garam Masala", quantity: 1, unit: "tsp" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Wash & Prep Fresh Spinach",
        description: "Thorough cleaning removes grit and soil from fresh spinach leaves.",
        actions: [
          "Trim tough stems from 400g fresh spinach leaves.",
          "Wash thoroughly in cold water twice to remove dirt.",
          "Drain water in a colander."
        ],
        time: "5 minutes",
        heat: "No heat",
        donenessCue: "Spinach leaves thoroughly cleaned and drained."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Blanch Spinach & Ice Shock",
        description: "Plunging blanched spinach into ice cold water locks in bright emerald green color.",
        actions: [
          "Bring 6 cups of water to a rolling boil in a pot.",
          "Add cleaned spinach leaves and boil for 2 minutes.",
          "Immediately drain and transfer spinach leaves into a bowl of ice water for 2 minutes."
        ],
        time: "5 minutes",
        heat: "High boil",
        donenessCue: "Spinach wilted but vibrant bright green."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Blend Puree",
        description: "Blending blanched spinach with green chili creates a smooth green base.",
        actions: [
          "Drain ice water from spinach leaves.",
          "Transfer leaves to a blender along with 1 green chili and 2 tbsp water.",
          "Blend into a smooth, thick green puree."
        ],
        time: "3 minutes",
        heat: "No heat",
        donenessCue: "Spinach puree should be vibrant green with no coarse leaves."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Cook Garlic Onion Aromatics",
        description: "Searing garlic in ghee creates the classic North Indian aromatic base.",
        actions: [
          "Heat 2 tablespoons of desi ghee in a pan over medium heat.",
          "Add cumin seeds and let them sizzle.",
          "Add minced garlic and onions; sauté for 6–8 minutes until onions turn translucent.",
          "Add chopped tomatoes, ginger paste, turmeric, and salt; cook until ghee specks appear."
        ],
        time: "8 minutes",
        heat: "Medium heat",
        donenessCue: "Onion tomato masala should be thick with ghee separating at edges."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Simmer Puree & Add Paneer",
        description: "Gentle simmering cooks the spinach without losing green brightness.",
        actions: [
          "Pour the green spinach puree into the cooked onion-tomato base and stir.",
          "Add salt, garam masala, and 1/4 cup water if needed.",
          "Simmer on low heat for 4 minutes.",
          "Add fresh paneer cubes and gently fold into the green gravy."
        ],
        time: "5 minutes",
        heat: "Low heat",
        donenessCue: "Paneer cubes warmed through and coated in green sauce."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Finish with Cream",
        description: "Fresh cream balances spinach astringency and adds luxurious body.",
        actions: [
          "Drizzle 3 tablespoons of fresh heavy cream over the palak paneer.",
          "Gently stir once and turn off heat.",
          "Serve hot garnished with extra cream."
        ],
        time: "2 minutes",
        heat: "Low heat",
        donenessCue: "Cream swirled into lush emerald green gravy."
      }
    ],
    tips: [
      "Never cover the pan after adding spinach puree; covering traps steam and turns spinach dull brownish-green.",
      "Plunging spinach into ice water immediately halts cooking and preserves chlorophyl color."
    ],
    servingSuggestions: ["Serve hot with garlic butter naan, roti, or jeera rice."],
    storage: ["Keep refrigerated in a closed glass container for up to 3 days."],
    tags: ["Vegetarian", "Healthy", "North Indian", "High Protein"],
    isPopular: true,
    isQuick: false,
    isHighProtein: true
  },
  {
    _id: "rec_5",
    title: "Masala Dosa",
    slug: "masala-dosa",
    description: "Crisp thin golden crepes made from fermented rice-lentil batter filled with a fragrant tempered potato masala, served with coconut chutney.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop",
    category: "Vegetarian",
    cuisine: "South Indian",
    difficulty: "Medium",
    cookingTime: "30 mins",
    prepTime: "15 mins",
    cookTime: "15 mins",
    totalTime: "30 mins",
    servings: 2,
    ingredientSections: [
      {
        sectionTitle: "For the Dosa Crepe",
        ingredients: [
          { name: "Fermented Dosa Batter", quantity: 500, unit: "ml" },
          { name: "Desi Ghee", quantity: 3, unit: "tbsp" }
        ]
      },
      {
        sectionTitle: "For the Potato Masala Filling",
        ingredients: [
          { name: "Boiled Potatoes", quantity: 4, unit: "medium" },
          { name: "Sliced Onions", quantity: 2, unit: "medium" },
          { name: "Mustard Seeds", quantity: 1, unit: "tsp" },
          { name: "Chana Dal", quantity: 1, unit: "tsp" },
          { name: "Green Chilies", quantity: 3, unit: "pcs" },
          { name: "Minced Ginger", quantity: 1, unit: "tsp" },
          { name: "Turmeric Powder", quantity: 0.5, unit: "tsp" },
          { name: "Curry Leaves", quantity: 12, unit: "leaves" },
          { name: "Cooking Oil", quantity: 1.5, unit: "tbsp" },
          { name: "Salt", quantity: 1, unit: "tsp" },
          { name: "Fresh Coriander", quantity: 2, unit: "tbsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Fermented Dosa Batter", quantity: 500, unit: "ml" },
      { name: "Boiled Potatoes", quantity: 4, unit: "medium" },
      { name: "Sliced Onions", quantity: 2, unit: "medium" },
      { name: "Mustard Seeds", quantity: 1, unit: "tsp" },
      { name: "Chana Dal", quantity: 1, unit: "tsp" },
      { name: "Curry Leaves", quantity: 12, unit: "leaves" },
      { name: "Turmeric Powder", quantity: 0.5, unit: "tsp" },
      { name: "Desi Ghee", quantity: 3, unit: "tbsp" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Boil and Mash Potatoes",
        description: "Soft coarsely mashed potatoes absorb South Indian spices for traditional filling.",
        actions: [
          "Boil 4 medium potatoes in a pressure cooker or pot until fork-tender.",
          "Peel skins and coarsely mash with a fork, leaving small texture chunks."
        ],
        time: "15 minutes",
        heat: "Medium heat (Boiling)",
        donenessCue: "Potatoes soft and easily mashed."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Temper South Indian Spices",
        description: "Mustard seeds, chana dal, and curry leaves provide classic crunch and aroma.",
        actions: [
          "Heat 1.5 tablespoons cooking oil in a pan over medium flame.",
          "Add mustard seeds and let them pop.",
          "Add chana dal, chopped green chilies, minced ginger, and fresh curry leaves; fry until chana dal is golden brown."
        ],
        time: "3 minutes",
        heat: "Medium heat",
        donenessCue: "Mustard seeds splutter and chana dal turns crunchy golden brown."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Cook Potato Masala Filling",
        description: "Sautéing onions with turmeric creates the moist, flavorful filling.",
        actions: [
          "Add sliced onions to the tempering and sauté for 5 minutes until soft and translucent.",
          "Stir in turmeric powder, salt, mashed potatoes, and 1/3 cup water.",
          "Mix thoroughly and cook for 3 minutes until moist and soft. Garnish with chopped fresh coriander."
        ],
        time: "8 minutes",
        heat: "Medium-low heat",
        donenessCue: "Potato masala is soft, moist, fragrant, and yellow."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Condition Dosa Tawa",
        description: "Wiping hot tawa with a damp cloth regulates temperature for smooth batter spreading.",
        actions: [
          "Heat a heavy cast-iron tawa or non-stick griddle over medium-high heat.",
          "Sprinkle a few drops of water on the hot tawa; it should sizzle immediately.",
          "Wipe clean with a damp cotton cloth or sliced onion half."
        ],
        time: "2 minutes",
        heat: "Medium-high heat",
        donenessCue: "Water sizzles and evaporates quickly."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Spread Batter & Roast Dosa",
        description: "Thin spreading in concentric circles produces a paper-thin, crispy crepe.",
        actions: [
          "Pour a ladleful of fermented dosa batter into the center of the tawa.",
          "Using the back of the ladle, quickly spread in light concentric circular motions working outward.",
          "Drizzle 1 teaspoon of desi ghee around the edges and over the top.",
          "Roast for 2–3 minutes over medium flame until underside turns deep golden brown and crisp."
        ],
        time: "3 minutes",
        heat: "Medium-high heat",
        donenessCue: "Underside golden brown and crisp; edges lift naturally off the tawa."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Stuff, Fold & Serve",
        description: "Placing potato masala inside and folding completes the crispy dosa.",
        actions: [
          "Place a generous scoop of potato masala in the center of the golden dosa.",
          "Fold both sides over the filling or roll into a cylinder.",
          "Transfer to a plate and serve hot with fresh coconut chutney and sambar."
        ],
        time: "2 minutes",
        heat: "Off heat",
        donenessCue: "Crispy golden dosa folded around warm potato masala."
      }
    ],
    tips: [
      "Always wipe the hot tawa with a damp cloth between dosas to lower surface heat before spreading batter.",
      "Using ghee instead of oil yields a crispier crepe with rich aroma."
    ],
    servingSuggestions: ["Serve piping hot with coconut chutney, tomato chutney, and hot sambar."],
    storage: ["Must be eaten fresh directly from the tawa for crispiness."],
    tags: ["Crispy", "Breakfast", "South Indian", "Vegetarian"],
    isPopular: true,
    isQuick: false,
    isHighProtein: false
  },
  {
    _id: "rec_6",
    title: "Vegetable Fried Rice",
    slug: "vegetable-fried-rice",
    description: "Fluffy wok-tossed jasmine rice with crisp carrots, french beans, sweet corn, minced garlic, soy sauce, and aromatic sesame oil.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200&auto=format&fit=crop",
    category: "Vegetarian",
    cuisine: "Asian",
    difficulty: "Easy",
    cookingTime: "20 mins",
    prepTime: "10 mins",
    cookTime: "10 mins",
    totalTime: "20 mins",
    servings: 2,
    ingredientSections: [
      {
        sectionTitle: "Rice & Aromatics",
        ingredients: [
          { name: "Cold Cooked Jasmine Rice", quantity: 4, unit: "cups" },
          { name: "Minced Garlic", quantity: 5, unit: "cloves" },
          { name: "Minced Ginger", quantity: 1, unit: "tsp" },
          { name: "Spring Onion Whites", quantity: 2, unit: "tbsp" },
          { name: "Spring Onion Greens", quantity: 2, unit: "tbsp" },
          { name: "Cooking Oil", quantity: 1, unit: "tbsp" }
        ]
      },
      {
        sectionTitle: "Vegetables & Seasonings",
        ingredients: [
          { name: "Diced Carrots", quantity: 0.5, unit: "cup" },
          { name: "Diced French Beans", quantity: 0.5, unit: "cup" },
          { name: "Sweet Corn", quantity: 0.25, unit: "cup" },
          { name: "Green Peas", quantity: 0.25, unit: "cup" },
          { name: "Soy Sauce", quantity: 2, unit: "tbsp" },
          { name: "Sesame Oil", quantity: 1.5, unit: "tbsp" },
          { name: "White Pepper Powder", quantity: 0.5, unit: "tsp" },
          { name: "Salt", quantity: 1, unit: "tsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Cold Cooked Rice", quantity: 4, unit: "cups" },
      { name: "Diced Carrots", quantity: 0.5, unit: "cup" },
      { name: "Diced French Beans", quantity: 0.5, unit: "cup" },
      { name: "Sweet Corn", quantity: 0.25, unit: "cup" },
      { name: "Green Peas", quantity: 0.25, unit: "cup" },
      { name: "Minced Garlic", quantity: 5, unit: "cloves" },
      { name: "Soy Sauce", quantity: 2, unit: "tbsp" },
      { name: "Sesame Oil", quantity: 1.5, unit: "tbsp" },
      { name: "Spring Onion", quantity: 4, unit: "stalks" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Prepare Cold Cooked Rice",
        description: "Day-old cold rice has dry, firm grains that won't turn mushy during high-heat stir frying.",
        actions: [
          "Use day-old chilled cooked Jasmine or Basmati rice from the refrigerator.",
          "Gently break up any rice clumps using clean fingers or a fork into separate grains."
        ],
        time: "3 minutes",
        heat: "No heat",
        donenessCue: "Rice grains separated with no sticky clumps."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Finely Dice Vegetables & Aromatics",
        description: "Uniform small dicing ensures vegetables cook rapidly in the wok.",
        actions: [
          "Finely dice carrots and french beans into uniform tiny cubes.",
          "Finely mince garlic, ginger, and separate green spring onion tops from white bulbs."
        ],
        time: "7 minutes",
        heat: "No heat",
        donenessCue: "Vegetables diced uniformly into tiny matching cubes."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Sear Wok & Sauté Aromatics",
        description: "Heating sesame oil in a smoking wok infuses authentic wok hei aroma.",
        actions: [
          "Heat 1.5 tablespoons sesame oil or vegetable oil in a carbon steel wok until smoking hot.",
          "Add minced garlic, ginger, and spring onion whites.",
          "Stir-fry vigorously for 30–45 seconds until fragrant."
        ],
        time: "1 minute",
        heat: "High heat (Smoking wok)",
        donenessCue: "Garlic fragrant and light golden without burning."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "High Heat Stir-Fry Vegetables",
        description: "Quick high-heat stir frying retains crisp texture and vivid vegetable color.",
        actions: [
          "Add diced carrots, french beans, sweet corn, and green peas into the wok.",
          "Stir-fry constantly over high flame for 2–3 minutes.",
          "Season with white pepper powder and 1 tsp salt."
        ],
        time: "3 minutes",
        heat: "High heat",
        donenessCue: "Vegetables bright, colorful, and tender-crisp."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Add Rice & Soy Sauce Toss",
        description: "High heat tossing caramelizes soy sauce around individual rice grains.",
        actions: [
          "Add cold cooked rice into the wok.",
          "Drizzle 2 tablespoons soy sauce around the rim of the wok.",
          "Toss continuously over high flame for 3 minutes until rice is hot and evenly coated."
        ],
        time: "3 minutes",
        heat: "High heat",
        donenessCue: "Rice piping hot, fluffy, and evenly caramelized."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Garnish & Serve",
        description: "Fresh spring onion greens add fresh crispness.",
        actions: [
          "Stir in chopped green spring onion tops.",
          "Toss once and turn off heat.",
          "Serve immediately."
        ],
        time: "1 minute",
        heat: "Off heat",
        donenessCue: "Fragrant wok-tossed fried rice ready to serve."
      }
    ],
    tips: [
      "Always use cold day-old refrigerated rice for fried rice; fresh warm rice releases moisture and turns gummy.",
      "Keep the wok smoking hot throughout cooking for authentic restaurant 'Wok Hei' smoky flavor."
    ],
    servingSuggestions: ["Pair with Veg Manchurian gravy, Chili Paneer, or Asian hot garlic sauce."],
    storage: ["Refrigerate in an airtight container for up to 3 days."],
    tags: ["Asian", "Quick & Easy", "Vegetarian"],
    isPopular: false,
    isQuick: true,
    isHighProtein: false
  },
  {
    _id: "rec_7",
    title: "Pasta Arrabbiata",
    slug: "pasta-arrabbiata",
    description: "Penne pasta coated in a spicy Italian tomato sauce cooked with extra virgin olive oil, sliced garlic, red chili flakes, and fresh sweet basil.",
    image: "/images/recipes/pasta-arrabbiata.jpg",
    category: "Vegetarian",
    cuisine: "Italian",
    difficulty: "Easy",
    cookingTime: "25 mins",
    prepTime: "10 mins",
    cookTime: "15 mins",
    totalTime: "25 mins",
    servings: 2,
    ingredientSections: [
      {
        sectionTitle: "For the Pasta",
        ingredients: [
          { name: "Penne Rigate Pasta", quantity: 250, unit: "g" },
          { name: "Water", quantity: 3, unit: "liters" },
          { name: "Sea Salt", quantity: 1, unit: "tbsp" }
        ]
      },
      {
        sectionTitle: "For the Spicy Arrabbiata Sauce",
        ingredients: [
          { name: "Crushed San Marzano Tomatoes", quantity: 400, unit: "g" },
          { name: "Extra Virgin Olive Oil", quantity: 4, unit: "tbsp" },
          { name: "Sliced Garlic", quantity: 6, unit: "cloves" },
          { name: "Red Chili Flakes", quantity: 1.5, unit: "tsp" },
          { name: "Fresh Basil", quantity: 10, unit: "leaves" },
          { name: "Black Pepper", quantity: 0.5, unit: "tsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Penne Rigate Pasta", quantity: 250, unit: "g" },
      { name: "Crushed Tomatoes", quantity: 400, unit: "g" },
      { name: "Extra Virgin Olive Oil", quantity: 4, unit: "tbsp" },
      { name: "Sliced Garlic", quantity: 6, unit: "cloves" },
      { name: "Red Chili Flakes", quantity: 1.5, unit: "tsp" },
      { name: "Fresh Basil", quantity: 10, unit: "leaves" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Boil Pasta Water & Prep Garlic",
        description: "Well-salted pasta water seasons penne from the inside while cooking.",
        actions: [
          "Bring 3 liters of water to a rolling boil in a large pot.",
          "Add 1 tablespoon sea salt to the boiling water.",
          "Thinly slice 6 cloves of garlic and measure red chili flakes."
        ],
        time: "5 minutes",
        heat: "High boil",
        donenessCue: "Water boiling vigorously."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Cook Penne Pasta Al Dente",
        description: "Cooking pasta al dente leaves a firm center bite so it finishes cooking in the spicy sauce.",
        actions: [
          "Drop 250g Penne Rigate into boiling salted water.",
          "Stir immediately to prevent sticking.",
          "Cook for 10 minutes (1–2 minutes less than package instructions).",
          "Reserve 1/2 cup starchy pasta water before draining."
        ],
        time: "10 minutes",
        heat: "High boil",
        donenessCue: "Pasta should be tender on the outside with a firm center bite (al dente)."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Infuse Garlic & Chili Olive Oil",
        description: "Gently frying sliced garlic in olive oil releases sweet garlic flavor without bitterness.",
        actions: [
          "Heat 4 tablespoons extra virgin olive oil in a wide skillet over medium-low heat.",
          "Add sliced garlic cloves and 1.5 tsp red chili flakes.",
          "Cook slowly for 2 minutes until garlic turns light golden and oil is fragrant."
        ],
        time: "2 minutes",
        heat: "Medium-low heat",
        donenessCue: "Garlic light golden and oil fragrant with chili."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Simmer Spicy Arrabbiata Sauce",
        description: "Simmering crushed San Marzano tomatoes thickens sauce into a fiery glaze.",
        actions: [
          "Pour crushed tomatoes into the garlic oil skillet.",
          "Season with sea salt and black pepper.",
          "Simmer on medium-low heat for 10–12 minutes, stirring occasionally, until sauce thickens."
        ],
        time: "12 minutes",
        heat: "Medium-low heat",
        donenessCue: "Sauce rich, thick, and oil begins pooling slightly at edges."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Emulsify Pasta & Sauce",
        description: "Starchy pasta water emulsifies olive oil and tomato sauce to cling to penne ridges.",
        actions: [
          "Add drained hot penne directly into the skillet with arrabbiata sauce.",
          "Splash 3–4 tablespoons reserved starchy pasta water.",
          "Toss vigorously over medium heat for 2 minutes."
        ],
        time: "2 minutes",
        heat: "Medium heat",
        donenessCue: "Sauce coats penne ridges completely in a glossy sheen."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Finish with Basil & Serve",
        description: "Torn fresh sweet basil adds classic Italian aroma.",
        actions: [
          "Tear fresh sweet basil leaves over pasta.",
          "Drizzle a teaspoon of extra virgin olive oil.",
          "Serve hot immediately."
        ],
        time: "1 minute",
        heat: "Off heat",
        donenessCue: "Hot glossy Penne Arrabbiata fragrant with fresh basil."
      }
    ],
    tips: [
      "Reserving and adding starchy pasta water creates a silky emulsion that makes the sauce stick to pasta.",
      "Do not brown garlic dark brown or black, or the arrabbiata sauce will taste bitter."
    ],
    servingSuggestions: ["Serve with warm crispy garlic bread and fresh grated Parmigiano-Reggiano."],
    storage: ["Store in a glass container in the fridge for up to 3 days."],
    tags: ["Italian", "Pasta", "Spicy", "Quick & Easy"],
    isPopular: true,
    isQuick: true,
    isHighProtein: false
  },
  {
    _id: "rec_8",
    title: "Chicken Pasta",
    slug: "chicken-pasta",
    description: "Fettuccine pasta tossed with garlic seared chicken breast strips in a luxurious Alfredo sauce made with heavy cream, butter, and grated parmesan.",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1200&auto=format&fit=crop",
    category: "Non-Vegetarian",
    cuisine: "Italian",
    difficulty: "Medium",
    cookingTime: "30 mins",
    prepTime: "10 mins",
    cookTime: "20 mins",
    totalTime: "30 mins",
    servings: 3,
    ingredientSections: [
      {
        sectionTitle: "For the Chicken & Pasta",
        ingredients: [
          { name: "Chicken Breast Strips", quantity: 450, unit: "g" },
          { name: "Fettuccine Pasta", quantity: 300, unit: "g" },
          { name: "Olive Oil", quantity: 1, unit: "tbsp" },
          { name: "Salt", quantity: 1, unit: "tsp" },
          { name: "Black Pepper", quantity: 0.5, unit: "tsp" },
          { name: "Garlic Powder", quantity: 0.5, unit: "tsp" }
        ]
      },
      {
        sectionTitle: "For the Creamy Alfredo Sauce",
        ingredients: [
          { name: "Heavy Cream", quantity: 200, unit: "ml" },
          { name: "Parmesan Cheese (grated)", quantity: 70, unit: "g" },
          { name: "Butter", quantity: 30, unit: "g" },
          { name: "Minced Garlic", quantity: 3, unit: "cloves" },
          { name: "Fresh Parsley", quantity: 2, unit: "tbsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Fettuccine Pasta", quantity: 300, unit: "g" },
      { name: "Chicken Breast Strips", quantity: 450, unit: "g" },
      { name: "Heavy Cream", quantity: 200, unit: "ml" },
      { name: "Parmesan Cheese", quantity: 70, unit: "g" },
      { name: "Butter", quantity: 30, unit: "g" },
      { name: "Minced Garlic", quantity: 3, unit: "cloves" },
      { name: "Fresh Parsley", quantity: 2, unit: "tbsp" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Slice & Season Chicken Breast",
        description: "Thin uniform chicken breast strips cook quickly and stay juicy.",
        actions: [
          "Cut 450g chicken breast into 1/2-inch thick strips.",
          "Pat dry with paper towels.",
          "Season generously with salt, black pepper, and garlic powder."
        ],
        time: "5 minutes",
        heat: "No heat",
        donenessCue: "Chicken strips evenly patted dry and seasoned."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Sear Chicken Strips in Butter",
        description: "Searing in butter caramelizes chicken exterior and creates pan juices for Alfredo sauce.",
        actions: [
          "Melt 15g butter in a wide skillet over medium-high heat.",
          "Add seasoned chicken strips in a single layer.",
          "Sear for 3 minutes per side until golden brown and cooked through.",
          "Transfer cooked chicken onto a plate."
        ],
        time: "6 minutes",
        heat: "Medium-high heat",
        donenessCue: "Chicken golden brown on outside and cooked through with no pink."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Boil Fettuccine Pasta Al Dente",
        description: "Boiling pasta al dente ensures fettuccine absorbs creamy Alfredo sauce.",
        actions: [
          "Bring 3 liters of salted water to a rolling boil.",
          "Add 300g fettuccine pasta and cook for 9 minutes.",
          "Reserve 1/2 cup starchy pasta water and drain pasta."
        ],
        time: "10 minutes",
        heat: "High boil",
        donenessCue: "Fettuccine flexible and cooked al dente."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Sauté Minced Garlic in Pan Butter",
        description: "Garlic sautéed in chicken pan drippings forms the Alfredo aromatic base.",
        actions: [
          "Melt remaining 15g butter in the same skillet over medium-low heat.",
          "Add minced garlic and stir for 1 minute until fragrant."
        ],
        time: "1 minute",
        heat: "Medium-low heat",
        donenessCue: "Garlic fragrant and translucent."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Build Creamy Alfredo Base",
        description: "Warming heavy cream gently creates a silky sauce without curdling.",
        actions: [
          "Pour 200ml heavy cream into the skillet, scraping up seared chicken browned bits.",
          "Simmer gently for 4–5 minutes over medium-low heat until cream bubbles."
        ],
        time: "5 minutes",
        heat: "Medium-low heat",
        donenessCue: "Cream thickened slightly and bubbling gently."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Whisk Fresh Parmesan Cheese",
        description: "Melting real parmesan cheese thickens Alfredo sauce into velvet consistency.",
        actions: [
          "Reduce heat to low.",
          "Add 70g freshly grated parmesan cheese in batches, whisking constantly until smooth.",
          "Season with freshly cracked black pepper."
        ],
        time: "2 minutes",
        heat: "Low heat",
        donenessCue: "Sauce smooth, rich, and velvety."
      },
      {
        step: 7,
        stepNumber: 7,
        title: "Toss Pasta & Seared Chicken",
        description: "Combining hot fettuccine and chicken allows Alfredo sauce to coat every ribbon.",
        actions: [
          "Add hot fettuccine and seared chicken strips into the Alfredo sauce.",
          "Splash 2–3 tbsp reserved pasta water to adjust creaminess.",
          "Toss gently for 1 minute until pasta ribbons are coated.",
          "Garnish with chopped fresh parsley and extra parmesan before serving."
        ],
        time: "2 minutes",
        heat: "Low heat",
        donenessCue: "Rich, creamy Alfredo sauce fully coating fettuccine ribbons and chicken."
      }
    ],
    tips: [
      "Always use freshly grated Parmigiano-Reggiano block; pre-shredded packaged cheese contains anti-caking agents that make sauce grainy.",
      "If the Alfredo sauce gets too thick, splash a tablespoon of hot starchy pasta water to loosen."
    ],
    servingSuggestions: ["Serve hot with freshly baked garlic bread and a side Caesar salad."],
    storage: ["Best enjoyed immediately when cooked."],
    tags: ["Pasta", "Creamy", "High Protein", "Italian"],
    isPopular: false,
    isQuick: true,
    isHighProtein: true
  },
  {
    _id: "rec_9",
    title: "Chicken Curry",
    slug: "chicken-curry",
    description: "Homestyle traditional North Indian chicken curry cooked with bone-in tender chicken in an onion-tomato gravy infused with coriander and whole spices.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200&auto=format&fit=crop",
    category: "Non-Vegetarian",
    cuisine: "Indian",
    difficulty: "Medium",
    cookingTime: "45 mins",
    prepTime: "15 mins",
    cookTime: "30 mins",
    totalTime: "45 mins",
    servings: 4,
    ingredientSections: [
      {
        sectionTitle: "Whole Spices & Aromatics",
        ingredients: [
          { name: "Bay Leaf", quantity: 1, unit: "pc" },
          { name: "Green Cardamom", quantity: 3, unit: "pcs" },
          { name: "Cinnamon Stick", quantity: 1, unit: "pc" },
          { name: "Chopped Onions", quantity: 3, unit: "medium" },
          { name: "Ginger-Garlic Paste", quantity: 2, unit: "tbsp" },
          { name: "Cooking Oil", quantity: 3, unit: "tbsp" }
        ]
      },
      {
        sectionTitle: "Chicken & Gravy Base",
        ingredients: [
          { name: "Bone-in Chicken", quantity: 800, unit: "g" },
          { name: "Tomato Puree", quantity: 3, unit: "medium" },
          { name: "Turmeric Powder", quantity: 0.5, unit: "tsp" },
          { name: "Kashmiri Red Chili Powder", quantity: 1, unit: "tbsp" },
          { name: "Coriander Powder", quantity: 1.5, unit: "tbsp" },
          { name: "Cumin Powder", quantity: 1, unit: "tsp" },
          { name: "Garam Masala", quantity: 1, unit: "tsp" },
          { name: "Salt", quantity: 1.5, unit: "tsp" },
          { name: "Water", quantity: 1.5, unit: "cups" },
          { name: "Fresh Coriander", quantity: 2, unit: "tbsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Bone-in Chicken", quantity: 800, unit: "g" },
      { name: "Chopped Onions", quantity: 3, unit: "medium" },
      { name: "Tomato Puree", quantity: 3, unit: "medium" },
      { name: "Ginger-Garlic Paste", quantity: 2, unit: "tbsp" },
      { name: "Coriander Powder", quantity: 1.5, unit: "tbsp" },
      { name: "Kashmiri Red Chili Powder", quantity: 1, unit: "tbsp" },
      { name: "Garam Masala", quantity: 1, unit: "tsp" },
      { name: "Cooking Oil", quantity: 3, unit: "tbsp" },
      { name: "Fresh Coriander", quantity: 2, unit: "tbsp" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Clean & Prep Chicken Pieces",
        description: "Cleaning and draining bone-in chicken prepares it for even spice absorption.",
        actions: [
          "Clean 800g bone-in chicken cuts thoroughly under cool water and drain in a colander.",
          "Pat dry with paper towels.",
          "Season with 1/2 tsp turmeric powder and 1 tsp salt; set aside for 10 minutes."
        ],
        time: "10 minutes",
        heat: "No heat",
        donenessCue: "Chicken clean, drained, and lightly seasoned."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Brown Onions for Gravy Base",
        description: "Slow browning of onions creates the deep golden color and rich sweetness of North Indian curry.",
        actions: [
          "Heat 3 tablespoons cooking oil in a heavy-bottomed pot over medium heat.",
          "Add whole spices (1 bay leaf, 3 green cardamoms, 1 cinnamon stick).",
          "Add finely chopped onions and sauté for 10–12 minutes, stirring frequently."
        ],
        time: "12 minutes",
        heat: "Medium heat",
        donenessCue: "Onions soft and deep golden brown."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Cook Ginger-Garlic Paste",
        description: "Sautéing ginger-garlic paste eliminates raw aroma.",
        actions: [
          "Add 2 tablespoons ginger-garlic paste to the browned onions.",
          "Stir continuously over medium heat for 2 minutes."
        ],
        time: "2 minutes",
        heat: "Medium heat",
        donenessCue: "Raw ginger-garlic aroma disappears completely."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Cook Tomato Masala & Powdered Spices",
        description: "Cooking tomatoes with ground spices until oil separates builds a thick curry base.",
        actions: [
          "Add tomato puree, coriander powder, Kashmiri chili powder, cumin powder, and turmeric powder.",
          "Cook over medium heat for 8 minutes, stirring regularly."
        ],
        time: "8 minutes",
        heat: "Medium heat",
        donenessCue: "Tomato masala thickens into a paste and small oil specks separate at edges."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Add & Sear Chicken (Bhoon Cooking)",
        description: "Searing chicken in hot masala seals in juices before simmering.",
        actions: [
          "Add seasoned bone-in chicken pieces to the pot.",
          "Turn heat to medium-high and sear chicken for 8 minutes, stirring to coat every piece in masala."
        ],
        time: "8 minutes",
        heat: "Medium-high heat",
        donenessCue: "Chicken turns opaque and takes on a reddish-brown masala color."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Add Water & Simmer Covered",
        description: "Covered simmering cooks meat to tender perfection while releasing bone flavor into gravy.",
        actions: [
          "Pour in 1.5 cups warm water and stir, scraping any browned bits from bottom of pot.",
          "Bring to a boil, cover with a tight lid, and lower heat to medium-low.",
          "Simmer for 20–25 minutes until chicken is tender."
        ],
        time: "25 minutes",
        heat: "Medium-low heat",
        donenessCue: "Chicken meat easily pierced with a fork and oil floats on top of rich curry."
      },
      {
        step: 7,
        stepNumber: 7,
        title: "Final Seasoning & Garnish",
        description: "Garam masala and fresh coriander added at the end preserve aromatic top notes.",
        actions: [
          "Uncover pot, sprinkle 1 tsp garam masala and salt if needed.",
          "Simmer uncovered for 2 minutes.",
          "Turn off heat, stir in fresh chopped coriander leaves, and rest for 5 minutes before serving."
        ],
        time: "5 minutes",
        heat: "Low heat",
        donenessCue: "Gravy rich, fragrant, thick, and oil glistening on top."
      }
    ],
    tips: [
      "Bone-in chicken yields significantly richer curry flavor than boneless breast.",
      "Allowing chicken curry to rest 10 minutes off heat improves gravy depth."
    ],
    servingSuggestions: ["Serve hot alongside steamed Basmati rice, roti, or warm garlic naan."],
    storage: ["Refrigerate in an airtight container for up to 4 days."],
    tags: ["Curry", "High Protein", "Indian", "Popular"],
    isPopular: true,
    isQuick: false,
    isHighProtein: true
  },
  {
    _id: "rec_10",
    title: "Chole",
    slug: "chole",
    description: "Tangy, dark Punjabi chickpeas simmered with dried pomegranate seeds, tea bag infusion, and aromatic chole masala gravy.",
    image: "/images/recipes/chole.jpg",
    category: "Vegetarian",
    cuisine: "Indian",
    difficulty: "Medium",
    cookingTime: "40 mins",
    prepTime: "15 mins",
    cookTime: "25 mins",
    totalTime: "40 mins",
    servings: 4,
    ingredientSections: [
      {
        sectionTitle: "For Pressure Cooking Chickpeas",
        ingredients: [
          { name: "Kabuli Chana (Chickpeas)", quantity: 2, unit: "cups" },
          { name: "Water", quantity: 4, unit: "cups" },
          { name: "Black Tea Bag", quantity: 1, unit: "pc" },
          { name: "Bay Leaf", quantity: 1, unit: "pc" },
          { name: "Cinnamon Stick", quantity: 1, unit: "pc" },
          { name: "Salt", quantity: 1, unit: "tsp" }
        ]
      },
      {
        sectionTitle: "For the Chole Gravy & Tadka",
        ingredients: [
          { name: "Pureed Onions", quantity: 2, unit: "medium" },
          { name: "Pureed Tomatoes", quantity: 2, unit: "medium" },
          { name: "Ginger-Garlic Paste", quantity: 1, unit: "tbsp" },
          { name: "Chole Masala", quantity: 2, unit: "tbsp" },
          { name: "Anardana Powder", quantity: 1, unit: "tbsp" },
          { name: "Kashmiri Red Chili Powder", quantity: 1, unit: "tsp" },
          { name: "Cumin Powder", quantity: 1, unit: "tsp" },
          { name: "Desi Ghee", quantity: 2, unit: "tbsp" },
          { name: "Green Chilies (slit)", quantity: 2, unit: "pcs" },
          { name: "Ginger Juliennes", quantity: 1, unit: "tbsp" },
          { name: "Cooking Oil", quantity: 2, unit: "tbsp" },
          { name: "Fresh Coriander", quantity: 2, unit: "tbsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Kabuli Chana", quantity: 2, unit: "cups" },
      { name: "Chole Masala", quantity: 2, unit: "tbsp" },
      { name: "Anardana Powder", quantity: 1, unit: "tbsp" },
      { name: "Pureed Onions", quantity: 2, unit: "medium" },
      { name: "Pureed Tomatoes", quantity: 2, unit: "medium" },
      { name: "Ginger-Garlic Paste", quantity: 1, unit: "tbsp" },
      { name: "Desi Ghee", quantity: 2, unit: "tbsp" },
      { name: "Black Tea Bag", quantity: 1, unit: "pc" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Soak Kabuli Chana Overnight",
        description: "Overnight soaking hydrates chickpeas for soft, melt-in-the-mouth texture.",
        actions: [
          "Rinse 2 cups Kabuli chana (white chickpeas) in cold water twice.",
          "Soak in 6 cups water overnight (8–10 hours)."
        ],
        time: "8 hours",
        heat: "No heat (Soaking)",
        donenessCue: "Chickpeas doubled in size and plump."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Pressure Cook with Tea Infusion",
        description: "Boiling with a black tea bag gives Punjabi chole its authentic dark brown color.",
        actions: [
          "Drain soaked water.",
          "In a pressure cooker, add chickpeas, 4 cups fresh water, 1 black tea bag, 1 bay leaf, 1 cinnamon stick, and 1 tsp salt.",
          "Pressure cook for 5–6 whistles over medium heat until melt-in-mouth soft."
        ],
        time: "20 minutes",
        heat: "Medium heat (Pressure cook)",
        donenessCue: "Chickpeas easily mashed between thumb and finger; color turned dark."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Cook Onion-Ginger-Garlic Base",
        description: "Slow browning onion paste builds a deep gravy base.",
        actions: [
          "Heat 2 tablespoons cooking oil in a pan over medium heat.",
          "Add pureed onions and sauté for 8–10 minutes until golden.",
          "Add 1 tbsp ginger-garlic paste and cook for 2 minutes."
        ],
        time: "10 minutes",
        heat: "Medium heat",
        donenessCue: "Onion paste golden brown and oil separates."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Add Chole Masala & Anardana",
        description: "Anardana (dried pomegranate powder) gives authentic Punjabi sourness and darkness.",
        actions: [
          "Add pureed tomatoes, 2 tbsp Chole Masala, 1 tbsp Anardana powder, Kashmiri red chili powder, and cumin powder.",
          "Cook over medium heat for 7 minutes until masala thickens and oil leaves sides."
        ],
        time: "7 minutes",
        heat: "Medium heat",
        donenessCue: "Masala dark, fragrant, and oil specks visible."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Combine Chickpeas & Mash Base",
        description: "Mashing a small portion of cooked chickpeas naturally thickens chole gravy.",
        actions: [
          "Discard tea bag from cooked chickpeas.",
          "Add cooked chickpeas along with their dark cooking broth into the masala pan.",
          "Use a potato masher to crush 15% of the chickpeas against the pan bottom."
        ],
        time: "3 minutes",
        heat: "Medium heat",
        donenessCue: "Gravy turns thick and body increases."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Simmer Chole Gravy",
        description: "Simmering allows chickpeas to absorb spice flavor and sourness.",
        actions: [
          "Cover and simmer on low-medium heat for 12–15 minutes.",
          "Adjust salt and gravy consistency with warm water if needed."
        ],
        time: "15 minutes",
        heat: "Low-medium heat",
        donenessCue: "Chickpeas soft, gravy thick, dark, and aromatic."
      },
      {
        step: 7,
        stepNumber: 7,
        title: "Ghee Tadka Tempering & Garnish",
        description: "Pouring hot ghee with ginger juliennes on top adds street-style gloss.",
        actions: [
          "In a small tadka pan, heat 2 tbsp desi ghee, add julienned ginger and slit green chilies.",
          "Pour sizzling ghee tadka over the chole.",
          "Garnish with fresh coriander leaves and sliced onions."
        ],
        time: "2 minutes",
        heat: "High heat (Tempering)",
        donenessCue: "Rich dark Punjabi chole with sizzling ghee top layer."
      }
    ],
    tips: [
      "Do not skip the tea bag during pressure cooking; it creates authentic dark color without changing taste.",
      "Anardana powder provides the characteristic authentic tartness of Dhaba Chole."
    ],
    servingSuggestions: ["Serve hot with puffy fluffy Bhature, kulchas, or steamed Basmati rice."],
    storage: ["Refrigerate in an airtight container for up to 4 days."],
    tags: ["Vegan", "High Protein", "Indian", "Popular"],
    isPopular: true,
    isQuick: false,
    isHighProtein: true
  },
  {
    _id: "rec_11",
    title: "Lemon Rice",
    slug: "lemon-rice",
    description: "Vibrant South Indian tempered rice infused with fresh lemon juice, crunchy peanuts, mustard seeds, turmeric, and curry leaves.",
    image: "/images/recipes/lemon-rice.jpg",
    category: "Vegetarian",
    cuisine: "South Indian",
    difficulty: "Easy",
    cookingTime: "15 mins",
    prepTime: "5 mins",
    cookTime: "10 mins",
    totalTime: "15 mins",
    servings: 2,
    ingredientSections: [
      {
        sectionTitle: "For the Rice Base",
        ingredients: [
          { name: "Cooked Rice", quantity: 3, unit: "cups" },
          { name: "Lemon Juice", quantity: 3, unit: "tbsp" },
          { name: "Cooking Oil", quantity: 2, unit: "tbsp" },
          { name: "Salt", quantity: 1, unit: "tsp" }
        ]
      },
      {
        sectionTitle: "For the South Indian Tempering (Tadka)",
        ingredients: [
          { name: "Peanuts", quantity: 0.25, unit: "cup" },
          { name: "Mustard Seeds", quantity: 1, unit: "tsp" },
          { name: "Chana Dal", quantity: 1, unit: "tsp" },
          { name: "Urad Dal", quantity: 1, unit: "tsp" },
          { name: "Green Chilies (slit)", quantity: 2, unit: "pcs" },
          { name: "Dried Red Chili", quantity: 1, unit: "pc" },
          { name: "Minced Ginger", quantity: 1, unit: "tsp" },
          { name: "Curry Leaves", quantity: 12, unit: "leaves" },
          { name: "Turmeric Powder", quantity: 0.5, unit: "tsp" },
          { name: "Hing (Asafoetida)", quantity: 1, unit: "pinch" }
        ]
      }
    ],
    ingredients: [
      { name: "Cooked Rice", quantity: 3, unit: "cups" },
      { name: "Lemon Juice", quantity: 3, unit: "tbsp" },
      { name: "Peanuts", quantity: 0.25, unit: "cup" },
      { name: "Mustard Seeds", quantity: 1, unit: "tsp" },
      { name: "Turmeric Powder", quantity: 0.5, unit: "tsp" },
      { name: "Chana Dal", quantity: 1, unit: "tsp" },
      { name: "Urad Dal", quantity: 1, unit: "tsp" },
      { name: "Curry Leaves", quantity: 12, unit: "leaves" },
      { name: "Green Chilies", quantity: 2, unit: "pcs" },
      { name: "Cooking Oil", quantity: 2, unit: "tbsp" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Cool & Fluff Cooked Rice",
        description: "Cooling cooked rice prevents grains from breaking during tempering.",
        actions: [
          "Spread 3 cups cooked Basmati or Sona Masoori rice on a wide plate.",
          "Drizzle 1 tsp cooking oil and fluff gently with a fork to separate grains.",
          "Allow to cool to room temperature."
        ],
        time: "5 minutes",
        heat: "No heat",
        donenessCue: "Rice grains cool and separated."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Fry Peanuts & Lentils",
        description: "Frying raw peanuts, chana dal, and urad dal creates South Indian nutty crunch.",
        actions: [
          "Heat 2 tablespoons cooking oil in a pan over medium heat.",
          "Add 1/4 cup raw peanuts and fry for 2 minutes until light golden.",
          "Add 1 tsp chana dal and 1 tsp urad dal; fry until golden brown."
        ],
        time: "3 minutes",
        heat: "Medium heat",
        donenessCue: "Peanuts and lentils golden, crunchy, and fragrant."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Temper Mustard & Curry Leaves",
        description: "Popping mustard seeds and crisping curry leaves infuses South Indian flavor oil.",
        actions: [
          "Add 1 tsp mustard seeds to hot oil and let them splutter.",
          "Add 2 slit green chilies, 1 dry red chili, minced ginger, and 12 fresh curry leaves.",
          "Sauté for 45 seconds."
        ],
        time: "1 minute",
        heat: "Medium heat",
        donenessCue: "Mustard seeds spluttered and curry leaves crisp."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Add Turmeric & Asafoetida",
        description: "Warming turmeric in oil blooms its yellow color and earthy flavor.",
        actions: [
          "Lower heat to low.",
          "Add 1/2 tsp turmeric powder, a pinch of hing (asafoetida), and 1 tsp salt.",
          "Stir for 15 seconds."
        ],
        time: "1 minute",
        heat: "Low heat",
        donenessCue: "Oil turns bright golden yellow."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Toss Fluffed Rice with Tempering",
        description: "Gently tossing rice coats every grain in golden tempered oil.",
        actions: [
          "Add cooled cooked rice into the pan.",
          "Using a gentle spatula motion, toss rice until every grain turns uniform yellow.",
          "Warm for 2 minutes on low heat."
        ],
        time: "2 minutes",
        heat: "Low heat",
        donenessCue: "Rice uniform yellow, fragrant, and warm."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Stir Lemon Juice Off Heat",
        description: "Adding fresh lemon juice off heat preserves vitamin C and prevents bitterness.",
        actions: [
          "Remove pan from heat completely.",
          "Squeeze 3 tablespoons fresh lemon juice over rice.",
          "Mix gently, cover with lid, and rest for 5 minutes before serving."
        ],
        time: "2 minutes",
        heat: "Off heat",
        donenessCue: "Tangy, bright yellow, fragrant lemon rice."
      }
    ],
    tips: [
      "Never cook lemon juice on direct heat, as high flame turns citrus juice bitter.",
      "Cooling rice before mixing prevents grains from turning mushy."
    ],
    servingSuggestions: ["Serve warm or at room temperature with potato fry, crisp papad, and coconut chutney."],
    storage: ["Store in an airtight container for 1 day at room temperature or 2 days refrigerated."],
    tags: ["South Indian", "Quick & Easy", "Tangy"],
    isPopular: false,
    isQuick: true,
    isHighProtein: false
  },
  {
    _id: "rec_12",
    title: "Egg Fried Rice",
    slug: "egg-fried-rice",
    description: "Fluffy wok-fried rice with scrambled eggs, green spring onions, soy sauce, and toasted sesame oil.",
    image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=1200&auto=format&fit=crop",
    category: "Non-Vegetarian",
    cuisine: "Asian",
    difficulty: "Easy",
    cookingTime: "15 mins",
    prepTime: "5 mins",
    cookTime: "10 mins",
    totalTime: "15 mins",
    servings: 2,
    ingredientSections: [
      {
        sectionTitle: "For the Scrambled Eggs",
        ingredients: [
          { name: "Large Eggs", quantity: 3, unit: "large" },
          { name: "Cooking Oil", quantity: 1, unit: "tbsp" },
          { name: "Salt", quantity: 0.25, unit: "tsp" },
          { name: "White Pepper Powder", quantity: 0.25, unit: "tsp" }
        ]
      },
      {
        sectionTitle: "For the Wok Fried Rice",
        ingredients: [
          { name: "Cold Cooked Rice", quantity: 3.5, unit: "cups" },
          { name: "Minced Garlic", quantity: 4, unit: "cloves" },
          { name: "Spring Onion Whites", quantity: 2, unit: "tbsp" },
          { name: "Spring Onion Greens", quantity: 2, unit: "tbsp" },
          { name: "Soy Sauce", quantity: 1.5, unit: "tbsp" },
          { name: "Sesame Oil", quantity: 1, unit: "tbsp" },
          { name: "Chili Oil", quantity: 0.5, unit: "tsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Cold Cooked Rice", quantity: 3.5, unit: "cups" },
      { name: "Large Eggs", quantity: 3, unit: "large" },
      { name: "Minced Garlic", quantity: 4, unit: "cloves" },
      { name: "Soy Sauce", quantity: 1.5, unit: "tbsp" },
      { name: "Sesame Oil", quantity: 1, unit: "tbsp" },
      { name: "Spring Onion", quantity: 4, unit: "stalks" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Prep Cold Rice & Beat Eggs",
        description: "Cold day-old rice stays dry and fluffy during wok frying.",
        actions: [
          "Use 3.5 cups cold day-old Jasmine or Basmati rice from the fridge; break up clumps.",
          "Crack 3 large eggs into a bowl, add a pinch of salt and white pepper, and whisk lightly."
        ],
        time: "3 minutes",
        heat: "No heat",
        donenessCue: "Eggs whisked and rice grains separated."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Scramble Soft Egg Curds",
        description: "Scrambling eggs quickly keeps curds tender and fluffy.",
        actions: [
          "Heat 1 tablespoon cooking oil in a hot wok over medium heat.",
          "Pour whisked eggs and scramble gently for 1 minute until 80% set.",
          "Remove soft scrambled eggs onto a plate."
        ],
        time: "2 minutes",
        heat: "Medium heat",
        donenessCue: "Soft yellow egg curds lightly set."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Stir Fry Garlic & Spring Onions",
        description: "High heat garlic oil forms the Asian wok aroma.",
        actions: [
          "Heat 1 tablespoon sesame oil in the same wok over high flame.",
          "Add minced garlic and spring onion whites; stir-fry for 30 seconds."
        ],
        time: "1 minute",
        heat: "High heat",
        donenessCue: "Garlic fragrant and sizzling."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Toss Cold Rice on High Flame",
        description: "High heat tossed rice absorbs wok hei flavor.",
        actions: [
          "Add cold cooked rice into the smoking wok.",
          "Stir-fry vigorously over high heat for 2 minutes, tossing continuously."
        ],
        time: "2 minutes",
        heat: "High heat",
        donenessCue: "Rice grains hot and dancing in wok."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Season with Soy Sauce & Sesame Oil",
        description: "Drizzling soy sauce around wok edges caramelizes seasoning.",
        actions: [
          "Drizzle 1.5 tablespoons light soy sauce around wok edges.",
          "Add white pepper powder, pinch of sugar, and 1/2 tsp chili oil.",
          "Toss rice for 1 minute until evenly coated and fragrant."
        ],
        time: "1 minute",
        heat: "High heat",
        donenessCue: "Rice caramelized light brown and fragrant."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Fold Eggs & Spring Greens",
        description: "Folding eggs back in keeps egg pieces soft and distinct.",
        actions: [
          "Add soft scrambled eggs and chopped green spring onion tops into the wok.",
          "Toss quickly for 30 seconds to break eggs into bite-sized pieces.",
          "Serve piping hot."
        ],
        time: "1 minute",
        heat: "High heat",
        donenessCue: "Hot egg fried rice speckled with soft egg curds and green spring onions."
      }
    ],
    tips: [
      "Scramble eggs softly and remove them before tossing rice so they stay tender.",
      "High flame tossing gives authentic Asian wok flavor."
    ],
    servingSuggestions: ["Serve hot with chili garlic sauce, Manchurian, or chili chicken."],
    storage: ["Refrigerate in an airtight container for up to 2 days."],
    tags: ["Asian", "Quick & Easy", "High Protein"],
    isPopular: false,
    isQuick: true,
    isHighProtein: true
  },
  {
    _id: "rec_13",
    title: "Tomato Pasta",
    slug: "tomato-pasta",
    description: "Light Italian spaghetti tossed with blistered sweet cherry tomatoes, minced garlic, extra virgin olive oil, and fresh torn basil.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop",
    category: "Vegetarian",
    cuisine: "Italian",
    difficulty: "Easy",
    cookingTime: "15 mins",
    prepTime: "5 mins",
    cookTime: "10 mins",
    totalTime: "15 mins",
    servings: 2,
    ingredientSections: [
      {
        sectionTitle: "For the Pasta",
        ingredients: [
          { name: "Spaghetti Pasta", quantity: 220, unit: "g" },
          { name: "Water", quantity: 3, unit: "liters" },
          { name: "Sea Salt", quantity: 1, unit: "tbsp" }
        ]
      },
      {
        sectionTitle: "For the Tomato Sauce & Garnish",
        ingredients: [
          { name: "Cherry Tomatoes (halved)", quantity: 300, unit: "g" },
          { name: "Extra Virgin Olive Oil", quantity: 4, unit: "tbsp" },
          { name: "Sliced Garlic", quantity: 6, unit: "cloves" },
          { name: "Red Chili Flakes", quantity: 0.5, unit: "tsp" },
          { name: "Fresh Basil", quantity: 10, unit: "leaves" },
          { name: "Parmesan Cheese (grated)", quantity: 30, unit: "g" },
          { name: "Black Pepper", quantity: 0.5, unit: "tsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Spaghetti Pasta", quantity: 220, unit: "g" },
      { name: "Cherry Tomatoes", quantity: 300, unit: "g" },
      { name: "Extra Virgin Olive Oil", quantity: 4, unit: "tbsp" },
      { name: "Sliced Garlic", quantity: 6, unit: "cloves" },
      { name: "Fresh Basil", quantity: 10, unit: "leaves" },
      { name: "Parmesan Cheese", quantity: 30, unit: "g" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Prep Tomatoes & Garlic",
        description: "Halving cherry tomatoes allows their juices to burst and form sauce quickly.",
        actions: [
          "Wash 300g cherry tomatoes and cut in half.",
          "Thinly slice 6 cloves of fresh garlic."
        ],
        time: "3 minutes",
        heat: "No heat",
        donenessCue: "Tomatoes halved and garlic sliced."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Boil Salted Spaghetti",
        description: "Boiling spaghetti in heavily salted water seasons pasta internally.",
        actions: [
          "Bring 3 liters of water to a rolling boil with 1 tbsp sea salt.",
          "Add 220g spaghetti and cook for 8–9 minutes al dente.",
          "Reserve 1/2 cup pasta water and drain spaghetti."
        ],
        time: "9 minutes",
        heat: "High boil",
        donenessCue: "Spaghetti cooked al dente with a firm bite."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Sauté Sliced Garlic in Olive Oil",
        description: "Gently frying garlic infuses olive oil with sweet aroma.",
        actions: [
          "Heat 4 tablespoons extra virgin olive oil in a wide pan over medium-low heat.",
          "Add sliced garlic and sizzle for 1.5 minutes until light golden."
        ],
        time: "2 minutes",
        heat: "Medium-low heat",
        donenessCue: "Garlic light golden and fragrant."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Blister Cherry Tomatoes",
        description: "High heat blistering bursts tomatoes into natural sweet juices.",
        actions: [
          "Add halved cherry tomatoes and 1/2 tsp salt into the pan.",
          "Cook over medium-high heat for 5 minutes, pressing tomatoes with a wooden spoon so juices burst."
        ],
        time: "5 minutes",
        heat: "Medium-high heat",
        donenessCue: "Cherry tomatoes collapsed, skin blistered, and juicy sauce formed."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Emulsify Spaghetti with Sauce",
        description: "Starchy pasta water binds olive oil and tomato juices into a glossy coating.",
        actions: [
          "Add hot cooked spaghetti and 3 tbsp reserved pasta water into the tomato pan.",
          "Toss vigorously over medium heat for 1 minute."
        ],
        time: "1 minute",
        heat: "Medium heat",
        donenessCue: "Juicy burst tomato sauce clinging to spaghetti strands."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Garnish with Basil & Serve",
        description: "Fresh basil torn at the end gives classic Italian fresh note.",
        actions: [
          "Tear fresh sweet basil leaves over pasta.",
          "Grate 30g fresh Parmesan cheese on top and serve hot."
        ],
        time: "1 minute",
        heat: "Off heat",
        donenessCue: "Hot fresh Tomato Basil Spaghetti ready to enjoy."
      }
    ],
    tips: [
      "Pressing cherry tomatoes with a wooden spoon bursts sweet juices directly into olive oil.",
      "Tear basil leaves by hand instead of chopping with knife to prevent darkening."
    ],
    servingSuggestions: ["Serve hot with warm toasted garlic bread and grated Parmesan."],
    storage: ["Refrigerate in a closed container for up to 2 days."],
    tags: ["Italian", "Quick & Easy", "Vegetarian"],
    isPopular: false,
    isQuick: true,
    isHighProtein: false
  },
  {
    _id: "rec_14",
    title: "Vegetable Noodles",
    slug: "vegetable-noodles",
    description: "Stir-fried Hakka noodles loaded with crisp julienned bell peppers, shredded cabbage, carrots, dark soy sauce, and vinegar.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop",
    category: "Vegetarian",
    cuisine: "Asian",
    difficulty: "Easy",
    cookingTime: "20 mins",
    prepTime: "10 mins",
    cookTime: "10 mins",
    totalTime: "20 mins",
    servings: 2,
    ingredientSections: [
      {
        sectionTitle: "For the Noodles",
        ingredients: [
          { name: "Hakka Noodles", quantity: 200, unit: "g" },
          { name: "Water", quantity: 2, unit: "liters" },
          { name: "Salt", quantity: 1, unit: "tsp" },
          { name: "Cooking Oil", quantity: 2, unit: "tbsp" }
        ]
      },
      {
        sectionTitle: "For Vegetables & Sauces",
        ingredients: [
          { name: "Shredded Cabbage", quantity: 1, unit: "cup" },
          { name: "Julienned Carrots", quantity: 0.75, unit: "cup" },
          { name: "Julienned Bell Peppers", quantity: 0.75, unit: "cup" },
          { name: "Sliced Onions", quantity: 0.5, unit: "cup" },
          { name: "Minced Garlic", quantity: 4, unit: "cloves" },
          { name: "Green Chilies", quantity: 2, unit: "pcs" },
          { name: "Dark Soy Sauce", quantity: 1.5, unit: "tbsp" },
          { name: "Chili Sauce", quantity: 1, unit: "tbsp" },
          { name: "Vinegar", quantity: 1, unit: "tsp" },
          { name: "Black Pepper", quantity: 0.5, unit: "tsp" },
          { name: "Spring Onion Greens", quantity: 2, unit: "tbsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Hakka Noodles", quantity: 200, unit: "g" },
      { name: "Shredded Cabbage", quantity: 1, unit: "cup" },
      { name: "Julienned Carrots", quantity: 0.75, unit: "cup" },
      { name: "Julienned Bell Peppers", quantity: 0.75, unit: "cup" },
      { name: "Sliced Onions", quantity: 0.5, unit: "cup" },
      { name: "Minced Garlic", quantity: 4, unit: "cloves" },
      { name: "Dark Soy Sauce", quantity: 1.5, unit: "tbsp" },
      { name: "Chili Sauce", quantity: 1, unit: "tbsp" },
      { name: "Vinegar", quantity: 1, unit: "tsp" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Boil Hakka Noodles Al Dente",
        description: "Boiling noodles correctly prevents them from becoming sticky during stir frying.",
        actions: [
          "Bring 2 liters of water to a rolling boil with 1 tsp salt and 1 tsp oil.",
          "Add 200g Hakka noodles and cook for 3–4 minutes until 80% cooked."
        ],
        time: "4 minutes",
        heat: "High boil",
        donenessCue: "Noodles pliable with a slight firm center."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Drain, Rinse & Oil Noodles",
        description: "Rinsing noodles in cold water halts cooking and oil keeps strands separated.",
        actions: [
          "Drain noodles in a colander and immediately rinse with cold water.",
          "Drizzle 1 tsp oil over noodles and toss gently with fingers to separate strands."
        ],
        time: "2 minutes",
        heat: "No heat",
        donenessCue: "Noodles cold, separate, and non-sticky."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Julienne Vegetables",
        description: "Thin matchstick slicing ensures uniform high-heat cooking.",
        actions: [
          "Finely slice cabbage, carrots, bell peppers, and onions into thin 2-inch long matchstick juliennes."
        ],
        time: "6 minutes",
        heat: "No heat",
        donenessCue: "Vegetables cut into uniform long thin juliennes."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "High Heat Stir Fry Vegetables",
        description: "High flame tossing retains vegetable crunch and color.",
        actions: [
          "Heat 2 tablespoons oil in a wok until smoking hot.",
          "Add minced garlic, green chilies, and sliced onions; toss for 30 seconds.",
          "Add julienned carrots, cabbage, and bell peppers; stir-fry over high heat for 2 minutes."
        ],
        time: "3 minutes",
        heat: "High heat (Smoking wok)",
        donenessCue: "Vegetables bright, colorful, and tender-crisp."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Add Noodles & Asian Sauces",
        description: "Soy sauce, chili sauce, and vinegar create Indo-Chinese noodle flavor.",
        actions: [
          "Add boiled Hakka noodles into the wok.",
          "Drizzle 1.5 tbsp dark soy sauce, 1 tbsp chili sauce, 1 tsp vinegar, black pepper, and salt.",
          "Toss using two tongs or spatulas over high flame for 2 minutes."
        ],
        time: "2 minutes",
        heat: "High heat",
        donenessCue: "Noodles dark glossy brown and piping hot."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Garnish & Serve Hot",
        description: "Spring onion greens add fresh crunch.",
        actions: [
          "Toss in spring onion greens.",
          "Serve hot immediately."
        ],
        time: "1 minute",
        heat: "Off heat",
        donenessCue: "Hot, non-sticky, smoky Veg Hakka Noodles ready."
      }
    ],
    tips: [
      "Rinsing boiled noodles under cold water and tossing with oil prevents clumping.",
      "High heat stir-frying is crucial so vegetables stay crunchy rather than soft."
    ],
    servingSuggestions: ["Serve hot with Chilli Paneer or Veg Manchurian."],
    storage: ["Keep refrigerated for up to 2 days."],
    tags: ["Asian", "Noodles", "Quick & Easy"],
    isPopular: false,
    isQuick: true,
    isHighProtein: false
  },
  {
    _id: "rec_15",
    title: "Vegetable Curry",
    slug: "vegetable-curry",
    description: "Garden vegetables simmered in a fragrant Indian curry sauce spiced with onion, tomatoes, cumin, and turmeric.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop",
    category: "Vegetarian",
    cuisine: "Indian",
    difficulty: "Medium",
    cookingTime: "30 mins",
    prepTime: "10 mins",
    cookTime: "20 mins",
    totalTime: "30 mins",
    servings: 3,
    ingredientSections: [
      {
        sectionTitle: "For the Vegetables",
        ingredients: [
          { name: "Diced Potatoes", quantity: 150, unit: "g" },
          { name: "Diced Carrots", quantity: 100, unit: "g" },
          { name: "Diced French Beans", quantity: 100, unit: "g" },
          { name: "Green Peas", quantity: 50, unit: "g" }
        ]
      },
      {
        sectionTitle: "For the Gravy & Masala",
        ingredients: [
          { name: "Chopped Onions", quantity: 1.5, unit: "medium" },
          { name: "Tomato Puree", quantity: 1, unit: "cup" },
          { name: "Ginger-Garlic Paste", quantity: 1, unit: "tbsp" },
          { name: "Cumin Seeds", quantity: 1, unit: "tsp" },
          { name: "Turmeric Powder", quantity: 0.5, unit: "tsp" },
          { name: "Coriander Powder", quantity: 1, unit: "tsp" },
          { name: "Kashmiri Red Chili Powder", quantity: 1, unit: "tsp" },
          { name: "Garam Masala", quantity: 1, unit: "tsp" },
          { name: "Salt", quantity: 1, unit: "tsp" },
          { name: "Cooking Oil", quantity: 2, unit: "tbsp" },
          { name: "Fresh Coriander", quantity: 2, unit: "tbsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Diced Potatoes", quantity: 150, unit: "g" },
      { name: "Diced Carrots", quantity: 100, unit: "g" },
      { name: "Diced French Beans", quantity: 100, unit: "g" },
      { name: "Green Peas", quantity: 50, unit: "g" },
      { name: "Chopped Onions", quantity: 1.5, unit: "medium" },
      { name: "Tomato Puree", quantity: 1, unit: "cup" },
      { name: "Ginger-Garlic Paste", quantity: 1, unit: "tbsp" },
      { name: "Cumin Seeds", quantity: 1, unit: "tsp" },
      { name: "Garam Masala", quantity: 1, unit: "tsp" },
      { name: "Fresh Coriander", quantity: 2, unit: "tbsp" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Dice & Prep Garden Vegetables",
        description: "Cutting vegetables into equal bite-sized cubes ensures uniform cooking.",
        actions: [
          "Dice 400g mixed vegetables (potatoes, carrots, french beans, green peas) into uniform 1-inch cubes."
        ],
        time: "5 minutes",
        heat: "No heat",
        donenessCue: "Vegetables cleaned and chopped into bite-sized cubes."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Par-Steam Vegetables",
        description: "Steaming vegetables partially reduces curry simmer time.",
        actions: [
          "Steam or boil diced potatoes, carrots, and beans for 6 minutes until 70% tender.",
          "Drain water and set aside."
        ],
        time: "6 minutes",
        heat: "Medium heat (Steaming)",
        donenessCue: "Vegetables slightly tender when pierced with a fork."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Sauté Cumin & Onion Base",
        description: "Browning onions creates the homestyle curry foundation.",
        actions: [
          "Heat 2 tablespoons cooking oil in a pan over medium heat.",
          "Add 1 tsp cumin seeds and let them sizzle.",
          "Add finely chopped onions and sauté for 6 minutes until golden brown."
        ],
        time: "6 minutes",
        heat: "Medium heat",
        donenessCue: "Onions golden brown and translucent."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Cook Tomato Masala & Spices",
        description: "Cooking tomato puree with ground spices develops rich curry color.",
        actions: [
          "Add ginger-garlic paste and sauté for 1 minute.",
          "Add 1 cup tomato puree, turmeric powder, coriander powder, chili powder, and salt.",
          "Cook for 6 minutes until oil specks separate from gravy."
        ],
        time: "6 minutes",
        heat: "Medium heat",
        donenessCue: "Tomato gravy thick with oil appearing around edges."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Add Vegetables & Simmer Curry",
        description: "Simmering lets vegetables absorb the rich spiced tomato gravy.",
        actions: [
          "Add par-steamed mixed vegetables and 1 cup warm water.",
          "Stir well, cover pan with lid, and simmer over low heat for 8 minutes."
        ],
        time: "8 minutes",
        heat: "Low-medium heat",
        donenessCue: "Vegetables completely tender and curry gravy rich."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Finish & Garnish",
        description: "Garam masala and fresh coriander add fragrant aroma.",
        actions: [
          "Sprinkle 1 tsp garam masala.",
          "Stir in chopped fresh coriander leaves.",
          "Serve hot."
        ],
        time: "2 minutes",
        heat: "Off heat",
        donenessCue: "Flavorful Vegetable Curry ready to serve."
      }
    ],
    tips: [
      "Par-steaming potatoes and carrots before adding to gravy ensures all vegetables cook evenly without becoming mushy."
    ],
    servingSuggestions: ["Serve hot with steamed rice, chapati, or roti."],
    storage: ["Refrigerate in a closed container for up to 3 days."],
    tags: ["Healthy", "Vegetarian", "Curry"],
    isPopular: false,
    isQuick: false,
    isHighProtein: false
  },
  {
    _id: "rec_16",
    title: "Vegetable Mixed Curry",
    slug: "vegetable-mixed-curry",
    description: "Garden vegetables simmered in a spiced coconut tomato gravy infused with curry powder and mustard seeds.",
    image: "/images/recipes/mixed-curry.jpg",
    category: "Vegetarian",
    cuisine: "Indian",
    difficulty: "Medium",
    cookingTime: "30 mins",
    prepTime: "10 mins",
    cookTime: "20 mins",
    totalTime: "30 mins",
    servings: 3,
    ingredientSections: [
      {
        sectionTitle: "For the Vegetables",
        ingredients: [
          { name: "Potatoes (diced)", quantity: 150, unit: "g" },
          { name: "Carrots (diced)", quantity: 100, unit: "g" },
          { name: "French Beans (diced)", quantity: 100, unit: "g" },
          { name: "Green Peas", quantity: 50, unit: "g" }
        ]
      },
      {
        sectionTitle: "For the Coconut Curry Gravy",
        ingredients: [
          { name: "Coconut Milk", quantity: 160, unit: "ml" },
          { name: "Chopped Onions", quantity: 1, unit: "medium" },
          { name: "Chopped Tomatoes", quantity: 2, unit: "medium" },
          { name: "Ginger-Garlic Paste", quantity: 1, unit: "tbsp" },
          { name: "Coconut Oil", quantity: 2, unit: "tbsp" },
          { name: "Mustard Seeds", quantity: 1, unit: "tsp" },
          { name: "Curry Leaves", quantity: 10, unit: "leaves" },
          { name: "Green Chilies", quantity: 2, unit: "pcs" },
          { name: "Curry Powder", quantity: 1.5, unit: "tbsp" },
          { name: "Turmeric Powder", quantity: 0.5, unit: "tsp" },
          { name: "Salt", quantity: 1, unit: "tsp" },
          { name: "Fresh Coriander", quantity: 2, unit: "tbsp" }
        ]
      }
    ],
    ingredients: [
      { name: "Potatoes", quantity: 150, unit: "g" },
      { name: "Carrots", quantity: 100, unit: "g" },
      { name: "French Beans", quantity: 100, unit: "g" },
      { name: "Green Peas", quantity: 50, unit: "g" },
      { name: "Coconut Milk", quantity: 160, unit: "ml" },
      { name: "Coconut Oil", quantity: 2, unit: "tbsp" },
      { name: "Mustard Seeds", quantity: 1, unit: "tsp" },
      { name: "Curry Leaves", quantity: 10, unit: "leaves" },
      { name: "Curry Powder", quantity: 1.5, unit: "tbsp" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: "Prep & Dice Vegetables",
        description: "Cutting vegetables uniformly ensures balanced cooking.",
        actions: [
          "Dice 400g mixed vegetables (potatoes, carrots, french beans, green peas) into 1-inch pieces."
        ],
        time: "5 minutes",
        heat: "No heat",
        donenessCue: "Vegetables cut uniformly into bite-sized cubes."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Par-Cook Mixed Vegetables",
        description: "Par-boiling vegetables shortens curry cooking time.",
        actions: [
          "Steam diced vegetables in salted water for 6 minutes until tender-crisp.",
          "Drain water and set aside."
        ],
        time: "6 minutes",
        heat: "Medium heat",
        donenessCue: "Vegetables 70% tender when tested with a fork."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Temper Mustard Seeds & Curry Leaves",
        description: "Mustard seeds and curry leaves infuse South-Indian style coconut flavor.",
        actions: [
          "Heat 2 tablespoons coconut oil in a pan over medium heat.",
          "Add 1 tsp mustard seeds and let splutter.",
          "Add 10 fresh curry leaves, chopped green chilies, and sliced onions; sauté until golden."
        ],
        time: "5 minutes",
        heat: "Medium heat",
        donenessCue: "Mustard seeds spluttered and onions golden."
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Cook Tomato & Curry Spices",
        description: "Sautéing curry powder blooms fragrant essential spices.",
        actions: [
          "Add chopped tomatoes, ginger-garlic paste, 1.5 tbsp curry powder, turmeric powder, and salt.",
          "Cook over medium heat for 6 minutes until tomatoes soften completely."
        ],
        time: "6 minutes",
        heat: "Medium heat",
        donenessCue: "Tomato curry paste thick and fragrant."
      },
      {
        step: 5,
        stepNumber: 5,
        title: "Simmer in Coconut Milk",
        description: "Coconut milk adds a mild, creamy, tropical body to the curry.",
        actions: [
          "Lower heat to low.",
          "Pour 160ml coconut milk and 1/2 cup warm water into the pan.",
          "Stir gently until smooth.",
          "Add par-cooked vegetables and simmer for 6 minutes."
        ],
        time: "6 minutes",
        heat: "Low heat",
        donenessCue: "Coconut gravy creamy, smooth, and gently simmering."
      },
      {
        step: 6,
        stepNumber: 6,
        title: "Finish & Serve",
        description: "Resting off flame lets coconut flavors settle.",
        actions: [
          "Turn off heat.",
          "Garnish with fresh coriander leaves.",
          "Serve hot."
        ],
        time: "2 minutes",
        heat: "Off heat",
        donenessCue: "Lush creamy coconut mixed vegetable curry ready to serve."
      }
    ],
    tips: [
      "Always add coconut milk over low heat to prevent curdling or splitting."
    ],
    servingSuggestions: ["Serve hot with steamed rice, appam, or parotta."],
    storage: ["Refrigerate in a closed glass container for up to 3 days."],
    tags: ["Healthy", "Vegetarian", "Curry"],
    isPopular: false,
    isQuick: false,
    isHighProtein: false
  }
];

module.exports = sampleRecipes;
