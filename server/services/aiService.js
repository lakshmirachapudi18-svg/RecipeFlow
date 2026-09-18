const { OPENROUTER_SYSTEM_PROMPT, buildRecipePrompt, buildDishPrompt, buildSubstitutePrompt } = require('../utils/prompts');
const { normalizeIngredientsList, validateRecipeMatch } = require('../utils/ingredientNormalizer');

const PRIMARY_MODEL = 'google/gemma-4-26b-a4b-it:free';
const FALLBACK_MODELS = ['openai/gpt-3.5-turbo'];

const generateAIRecipe = async ({ ingredients, originalIngredients, cuisine, servings, preferences, dietaryPreference }) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  const normalizedIngredients = normalizeIngredientsList(ingredients || originalIngredients);
  const prompt = buildRecipePrompt({ ingredients: normalizedIngredients, cuisine, servings, preferences, dietaryPreference });

  console.log('[AI] Ingredients:', normalizedIngredients.join(', '));
  console.log('[AI] Mode: ingredients');

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_new_openrouter_key')) {
    console.warn('⚠️ [AI] OpenRouter API key is missing or invalid.');
    const err = new Error('The AI service is temporarily unavailable. Please try again.');
    err.code = 'AI_SERVICE_ERROR';
    throw err;
  }

  const modelQueue = [PRIMARY_MODEL, ...FALLBACK_MODELS];
  let lastErrorType = 'AI_SERVICE_ERROR';

  for (const model of modelQueue) {
    console.log('[AI] Calling OpenRouter...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000); // 35 second timeout

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://recipeflow.app',
          'X-Title': 'RecipeFlow Smart Recipe App'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: OPENROUTER_SYSTEM_PROMPT },
            { role: 'user', content: prompt }
          ],
          temperature: 0.5
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[AI] OpenRouter error (${model} HTTP ${response.status}):`, errText);
        lastErrorType = 'AI_SERVICE_ERROR';
        continue;
      }

      const data = await response.json();
      console.log('[AI] OpenRouter response received');

      if (data.error) {
        console.error(`[AI] OpenRouter error (${model}):`, data.error.message || data.error);
        lastErrorType = 'AI_SERVICE_ERROR';
        continue;
      }

      console.log('[AI] Parsing response...');
      const content = data.choices?.[0]?.message?.content;
      const parsed = parseJSONContent(content);

      if (!parsed || typeof parsed !== 'object' || !parsed.recipeName) {
        console.warn(`[AI] JSON parsing returned invalid structure for model ${model}`);
        lastErrorType = 'AI_RESPONSE_ERROR';
        continue;
      }

      console.log('[AI] Validating recipe...');
      const isValid = validateRecipeMatch(parsed, normalizedIngredients);
      if (!isValid) {
        console.warn(`[AI] Recipe validation failed for "${parsed.recipeName}" against input ingredients`);
        lastErrorType = 'AI_VALIDATION_ERROR';
        continue;
      }

      console.log(`[AI] Recipe: ${parsed.recipeName}`);
      return parsed;

    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.error(`[AI] OpenRouter request timed out (model: ${model})`);
      } else {
        console.error(`[AI] OpenRouter error (${model}):`, error.message);
      }
      lastErrorType = 'AI_SERVICE_ERROR';
    }
  }

  const customErr = new Error(
    lastErrorType === 'AI_VALIDATION_ERROR'
      ? 'The AI generated a recipe that does not match the requested ingredients.'
      : lastErrorType === 'AI_RESPONSE_ERROR'
      ? 'The AI returned an invalid recipe response.'
      : 'The AI service is temporarily unavailable.'
  );
  customErr.code = lastErrorType;
  throw customErr;
};

/**
 * Dish Search Mode: Generates a recipe specifically for dishName using AI
 */
const generateAIDishRecipe = async ({ dishName, servings, cuisine, preferences }) => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const prompt = buildDishPrompt({ dishName, servings, cuisine: cuisine || preferences?.cuisine });

  console.log('[AI] Mode: dish');
  console.log('[AI] Dish Name:', dishName);

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_new_openrouter_key')) {
    console.warn('⚠️ [AI] OpenRouter API key is missing or invalid.');
    const err = new Error('The AI service is temporarily unavailable. Please try again.');
    err.code = 'AI_SERVICE_ERROR';
    throw err;
  }

  const modelQueue = [PRIMARY_MODEL, ...FALLBACK_MODELS];
  let lastErrorType = 'AI_SERVICE_ERROR';

  for (const model of modelQueue) {
    console.log('[AI] Calling OpenRouter...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://recipeflow.app',
          'X-Title': 'RecipeFlow Smart Recipe App'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: 'You are RecipeFlow\'s expert culinary assistant. Return ONLY valid JSON.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.5
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[AI] OpenRouter error (${model} HTTP ${response.status}):`, errText);
        lastErrorType = 'AI_SERVICE_ERROR';
        continue;
      }

      const data = await response.json();
      console.log('[AI] OpenRouter response received');

      if (data.error) {
        console.error(`[AI] OpenRouter error (${model}):`, data.error.message || data.error);
        lastErrorType = 'AI_SERVICE_ERROR';
        continue;
      }

      console.log('[AI] Parsing response...');
      const content = data.choices?.[0]?.message?.content;
      const parsed = parseJSONContent(content);

      if (!parsed || typeof parsed !== 'object' || !parsed.recipeName) {
        console.warn(`[AI] JSON parsing returned invalid structure for model ${model}`);
        lastErrorType = 'AI_RESPONSE_ERROR';
        continue;
      }

      parsed.matchScore = 100;
      parsed.matchReason = `Complete authentic recipe generated for ${dishName}.`;
      console.log(`[AI] Recipe: ${parsed.recipeName}`);
      return parsed;

    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.error(`[AI] OpenRouter request timed out (model: ${model})`);
      } else {
        console.error(`[AI] OpenRouter error (${model}):`, error.message);
      }
      lastErrorType = 'AI_SERVICE_ERROR';
    }
  }

  const customErr = new Error(
    lastErrorType === 'AI_RESPONSE_ERROR'
      ? 'The AI returned an invalid recipe response.'
      : 'The AI service is temporarily unavailable.'
  );
  customErr.code = lastErrorType;
  throw customErr;
};

const getAISubstitute = async ({ ingredient, recipeContext }) => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const prompt = buildSubstitutePrompt({ ingredient, recipeContext });

  if (!apiKey || apiKey.trim() === '') {
    return generateFallbackSubstitute(ingredient);
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://recipeflow.app',
        'X-Title': 'RecipeFlow Smart Recipe App'
      },
      body: JSON.stringify({
        model: PRIMARY_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6
      })
    });

    if (!response.ok) {
      return generateFallbackSubstitute(ingredient);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    return parseJSONContent(content) || generateFallbackSubstitute(ingredient);
  } catch (error) {
    console.error('[AI] OpenRouter substitute error:', error.message);
    return generateFallbackSubstitute(ingredient);
  }
};

const parseJSONContent = (content) => {
  if (!content || typeof content !== 'string') return null;
  try {
    let cleaned = content.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json|text)?\s*/i, '').replace(/\s*```$/, '');
    }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn('[AI] Failed to parse AI JSON response:', err.message);
    return null;
  }
};

/**
 * Controlled fallback recipe generator bound strictly to user's normalized ingredients.
 */
const generateFallbackRecipe = (normalizedIngredients, cuisine, servings, preferences) => {
  const ingList = Array.isArray(normalizedIngredients) && normalizedIngredients.length > 0
    ? normalizedIngredients
    : ['vegetables', 'onion', 'garlic'];

  const lowerList = ingList.map(i => i.toLowerCase());

  const proteins = ['chicken', 'mutton', 'paneer', 'fish', 'egg', 'prawn', 'tofu', 'mushroom'];
  const carbs = ['rice', 'pasta', 'noodle', 'bread', 'potato'];
  const vegs = ['gobi', 'cauliflower', 'spinach', 'palak', 'dal', 'lentil', 'tomato', 'capsicum', 'chilli', 'onion'];

  let mainIng = lowerList.find(ing => proteins.some(p => ing.includes(p)));
  if (!mainIng) {
    mainIng = lowerList.find(ing => carbs.some(c => ing.includes(c)));
  }
  if (!mainIng) {
    mainIng = lowerList.find(ing => vegs.some(v => ing.includes(v)));
  }
  if (!mainIng) {
    mainIng = ingList[0].toLowerCase();
  }

  const capIng = mainIng.charAt(0).toUpperCase() + mainIng.slice(1);
  const selectedCuisine = cuisine || preferences?.cuisine || 'Indian';
  const numServings = Number(servings) || 4;

  let recipeName = `${capIng} Masala`;
  if (mainIng.includes('chicken')) {
    recipeName = lowerList.includes('rice') ? 'Chicken Biryani' : 'Chicken Masala Curry';
  } else if (mainIng.includes('mutton')) {
    recipeName = lowerList.includes('rice') ? 'Mutton Biryani' : 'Mutton Masala Curry';
  } else if (mainIng.includes('paneer')) {
    recipeName = 'Paneer Butter Masala';
  } else if (mainIng.includes('egg')) {
    recipeName = lowerList.includes('rice') ? 'Egg Fried Rice' : 'Egg Masala Curry';
  } else if (mainIng.includes('potato')) {
    recipeName = 'Aloo Masala Fry';
  } else if (mainIng.includes('rice')) {
    recipeName = 'Vegetable Rice Pilaf';
  } else if (mainIng.includes('fish')) {
    recipeName = 'Fish Curry';
  }

  const haveItems = ingList.map((ing) => {
    const ingLower = ing.toLowerCase();
    let qty = '2 medium';
    if (proteins.some(p => ingLower.includes(p))) {
      qty = '750 g';
    } else if (ingLower.includes('oil')) {
      qty = '3 tbsp';
    } else if (ingLower.includes('powder') || ingLower.includes('masala') || ingLower.includes('spice')) {
      qty = '1.5 tsp';
    } else if (ingLower.includes('garlic') || ingLower.includes('ginger')) {
      qty = '1 tbsp, minced';
    }
    return {
      name: ing.charAt(0).toUpperCase() + ing.slice(1),
      quantity: qty
    };
  });

  const needItems = [
    { name: 'Salt', quantity: '1.5 tsp' },
    { name: 'Water', quantity: '2 cups' },
    { name: 'Fresh Coriander Leaves', quantity: '2 tbsp' }
  ];

  return {
    recipeName: recipeName,
    matchScore: Math.min(95, Math.max(70, Math.round((ingList.length / (ingList.length + 2)) * 100))),
    usedIngredientCount: ingList.length,
    availableIngredientCount: ingList.length,
    matchReason: `This recipe utilizes your available ${capIng} and kitchen ingredients with only basic seasoning additions.`,
    servings: numServings,
    prepTime: '20 mins',
    cookTime: '35 mins',
    totalTime: '55 mins',
    difficulty: 'Medium',
    cuisine: selectedCuisine,
    ingredientsYouHave: haveItems,
    additionalIngredients: needItems,
    ingredients: [...haveItems, ...needItems],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: `Prepare the ${capIng} & Aromatics`,
        description: `Clean and prepare the ${mainIng}. Chop onions, tomatoes, ginger, and garlic finely to create a rich flavor base.`,
        actions: [
          `Prep and clean the ${mainIng} thoroughly.`,
          `Finely chop onions, tomatoes, and green chillies.`,
          `Mince the ginger and garlic into a smooth paste.`
        ],
        time: '15 mins',
        heat: 'No heat',
        donenessCue: `Aromatics prepped and ${mainIng} ready for cooking.`
      },
      {
        step: 2,
        stepNumber: 2,
        title: 'Sear Aromatics in Oil',
        description: 'Heat cooking oil in a heavy-bottomed pot over medium heat. Sauté chopped onions until golden brown.',
        actions: [
          'Heat 3 tbsp oil over medium flame for 1 minute.',
          'Add chopped onions and sauté for 8-10 minutes.',
          'Stir in ginger-garlic paste and green chillies; cook until fragrant.'
        ],
        time: '10 mins',
        heat: 'Medium',
        donenessCue: 'Onions turn deep golden brown and raw garlic aroma disappears completely.'
      },
      {
        step: 3,
        stepNumber: 3,
        title: 'Build Spiced Base',
        description: 'Add chopped tomatoes and powdered spices. Cook until tomatoes breakdown and oil separates.',
        actions: [
          'Add chopped tomatoes, turmeric, chilli powder, and garam masala.',
          'Cook over medium heat for 6-8 minutes, stirring frequently.',
          'Add salt to season the base evenly.'
        ],
        time: '8 mins',
        heat: 'Medium',
        donenessCue: 'Tomatoes soften into a thick paste and droplets of oil release around edges.'
      },
      {
        step: 4,
        stepNumber: 4,
        title: `Add ${capIng} & Sear`,
        description: `Add the prepared ${mainIng} into the pan. Coat thoroughly with the spiced masala base.`,
        actions: [
          `Add ${mainIng} into the simmering gravy.`,
          `Sear the ${mainIng} in spices for 8-10 minutes.`,
          'Ensure the spice coating caramelizes onto the main ingredients.'
        ],
        time: '10 mins',
        heat: 'Medium-High',
        donenessCue: `${capIng} absorbs spices and takes on a rich, aromatic color.`
      },
      {
        step: 5,
        stepNumber: 5,
        title: 'Simmer Until Done',
        description: 'Add 2 cups of water, cover with lid, and simmer until tender and cooked through.',
        actions: [
          'Pour in 2 cups warm water and mix thoroughly.',
          'Cover with a lid and simmer over medium-low heat for 20-25 minutes.'
        ],
        time: '25 mins',
        heat: 'Medium-Low',
        donenessCue: `${capIng} is tender, succulent, and fully cooked through.`
      },
      {
        step: 6,
        stepNumber: 6,
        title: 'Garnish & Serve',
        description: 'Garnish with fresh coriander leaves before serving.',
        actions: [
          'Uncover pot and adjust seasoning if needed.',
          'Garnish generously with chopped fresh coriander leaves.',
          'Turn off heat and let sit covered for 5 minutes before serving.'
        ],
        time: '5 mins',
        heat: 'Off',
        donenessCue: 'Gravy is thick, glossy, aromatic, and ready to enjoy.'
      }
    ],
    tips: [
      `Browning the onions properly builds the foundational flavor for your ${capIng} dish.`
    ],
    servingSuggestions: [
      'Serve hot alongside warm naan, chapati, or steamed Basmati rice.'
    ]
  };
};

const generateFallbackDishRecipe = (dishName, servings, cuisine) => {
  const capDish = dishName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const numServings = Number(servings) || 4;

  return {
    recipeName: capDish,
    matchScore: 100,
    matchReason: `Authentic recipe generated for ${capDish}.`,
    servings: numServings,
    prepTime: '20 mins',
    cookTime: '35 mins',
    totalTime: '55 mins',
    difficulty: 'Medium',
    cuisine: cuisine || 'Indian',
    ingredientsYouHave: [],
    additionalIngredients: [],
    ingredients: [
      { name: capDish + " Main Base", quantity: "500 g" },
      { name: "Cooking Oil / Ghee", quantity: "3 tbsp" },
      { name: "Onions (chopped)", quantity: "2 medium" },
      { name: "Tomatoes (pureed)", quantity: "2 medium" },
      { name: "Ginger-Garlic Paste", quantity: "1.5 tbsp" },
      { name: "Spices & Seasoning", quantity: "to taste" }
    ],
    instructions: [
      {
        step: 1,
        stepNumber: 1,
        title: `Prepare Main Ingredients for ${capDish}`,
        description: `Clean and prep main ingredients for ${capDish}.`,
        actions: [
          `Prep and clean all main ingredients.`,
          `Chop onions, tomatoes, and aromatics.`
        ],
        time: "10 mins",
        heat: "No heat",
        donenessCue: "Ingredients prepped."
      },
      {
        step: 2,
        stepNumber: 2,
        title: "Sauté Aromatics & Spices",
        description: "Heat oil and brown onions to build gravy foundation.",
        actions: [
          "Heat oil in a pan over medium heat.",
          "Add chopped onions and sauté until golden brown.",
          "Stir in ginger-garlic paste and cook for 2 minutes."
        ],
        time: "10 mins",
        heat: "Medium",
        donenessCue: "Aromatics fragrant and golden brown."
      },
      {
        step: 3,
        stepNumber: 3,
        title: "Build Sauce & Simmer",
        description: "Add tomatoes, spices, and main ingredients into gravy.",
        actions: [
          "Add tomato puree and powdered spices.",
          "Add main ingredients and simmer covered until tender."
        ],
        time: "25 mins",
        heat: "Medium-Low",
        donenessCue: `${capDish} cooked through and tender.`
      },
      {
        step: 4,
        stepNumber: 4,
        title: "Garnish & Serve",
        description: "Garnish with fresh herbs and serve hot.",
        actions: [
          "Garnish with fresh coriander leaves.",
          "Serve piping hot."
        ],
        time: "2 mins",
        heat: "Off",
        donenessCue: `${capDish} ready to enjoy.`
      }
    ],
    tips: [
      `Allow ${capDish} to rest for 5 minutes after cooking to maximize flavor.`
    ],
    servingSuggestions: [
      "Serve hot with steamed Basmati rice or fresh naan bread."
    ]
  };
};

const generateFallbackSubstitute = (ingredient) => {
  const ing = ingredient.toLowerCase();
  let subs = [];

  if (ing.includes('butter')) {
    subs = [
      { name: 'Olive Oil', recommendedQuantity: '3/4 cup oil per 1 cup butter', explanation: 'Ideal for cooking and baking.' },
      { name: 'Ghee (Clarified Butter)', recommendedQuantity: '1:1 ratio', explanation: 'High smoke point with rich flavor.' }
    ];
  } else {
    subs = [
      { name: `Alternative ${ingredient} option A`, recommendedQuantity: '1:1 ratio', explanation: 'Provides a similar texture profile.' },
      { name: `Alternative ${ingredient} option B`, recommendedQuantity: 'Equal volume', explanation: 'Keeps flavor balance harmonious.' }
    ];
  }

  return {
    originalIngredient: ingredient,
    substitutes: subs
  };
};

module.exports = { generateAIRecipe, generateAIDishRecipe, getAISubstitute };
