/**
 * RecipeFlow Ingredient Normalizer & Match Validator
 */

const INGREDIENT_ALIASES = {
  // Paneer & Dairy variations
  'panner': 'paneer',
  'paner': 'paneer',
  'panneer': 'paneer',
  'panere': 'paneer',
  'cottage cheese': 'paneer',

  // Onion variations
  'onnion': 'onion',
  'onionn': 'onion',
  'onions': 'onion',
  'pyaz': 'onion',
  'piaz': 'onion',

  // Ginger variations
  'gingger': 'ginger',
  'ginge': 'ginger',
  'adrak': 'ginger',

  // Garlic variations
  'garlics': 'garlic',
  'garlik': 'garlic',
  'lehsun': 'garlic',
  'lasun': 'garlic',

  // Tomato variations
  'tomatos': 'tomato',
  'tomatoes': 'tomato',
  'tomatoto': 'tomato',
  'tamatar': 'tomato',

  // Chicken variations
  'chikcen': 'chicken',
  'chickn': 'chicken',
  'chiken': 'chicken',
  'chickin': 'chicken',
  'murgh': 'chicken',

  // Mutton variations
  'muton': 'mutton',
  'muttonn': 'mutton',
  'lamb': 'mutton',
  'goat': 'mutton',
  'gosht': 'mutton',

  // Potato variations
  'potatos': 'potato',
  'potatoes': 'potato',
  'potaoto': 'potato',
  'aloo': 'potato',
  'alu': 'potato',

  // Chilli & Pepper variations
  'chilly': 'chilli',
  'chilies': 'chilli',
  'chillies': 'chilli',
  'chili': 'chilli',
  'chilis': 'chilli',
  'green chilli': 'green chilli',
  'green chili': 'green chilli',
  'green chilly': 'green chilli',
  'hari mirch': 'green chilli',

  // Rice variations
  'ric': 'rice',
  'chawal': 'rice',
  'basmati': 'basmati rice',

  // Egg variations
  'eggs': 'egg',
  'anda': 'egg',

  // Butter & Oils
  'buter': 'butter',
  'buttr': 'butter',
  'makkhan': 'butter',

  // Spices & Powders
  'turmeric': 'turmeric powder',
  'turmericpowder': 'turmeric powder',
  'haldi': 'turmeric powder',
  'chilli powder': 'chilli powder',
  'chilly powder': 'chilli powder',
  'red chilli powder': 'chilli powder',
  'lal mirch': 'chilli powder',
  'garammasala': 'garam masala',
  'coriander': 'coriander leaves',
  'cilantro': 'coriander leaves',
  'dhania': 'coriander leaves'
};

const MAJOR_PROTEINS = [
  'chicken', 'mutton', 'paneer', 'fish', 'egg', 'potato', 'prawn', 'shrimp', 'tofu', 'beef', 'pork'
];

/**
 * Normalizes a single ingredient string.
 */
const normalizeIngredient = (rawStr) => {
  if (!rawStr || typeof rawStr !== 'string') return '';
  let str = rawStr.toLowerCase().trim();

  if (INGREDIENT_ALIASES[str]) {
    return INGREDIENT_ALIASES[str];
  }

  // Plural removal for standard words
  if (str.endsWith('s') && !str.endsWith('ss') && str.length > 3) {
    const singular = str.slice(0, -1);
    if (INGREDIENT_ALIASES[singular]) {
      return INGREDIENT_ALIASES[singular];
    }
    return singular;
  }

  return str;
};

/**
 * Takes an array or comma-separated string and returns a deduplicated normalized array.
 */
const normalizeIngredientsList = (rawInput) => {
  let rawList = [];
  if (Array.isArray(rawInput)) {
    rawList = rawInput;
  } else if (typeof rawInput === 'string' && rawInput.trim() !== '') {
    rawList = rawInput.split(',');
  }

  const normalized = rawList
    .map(item => (typeof item === 'string' ? normalizeIngredient(item) : ''))
    .filter(Boolean)
    .filter((item, index, self) => self.indexOf(item) === index);

  return normalized;
};

/**
 * Identifies the main protein/primary base ingredient from a recipe title.
 */
const extractMainProtein = (recipeTitle) => {
  if (!recipeTitle || typeof recipeTitle !== 'string') return null;
  const titleLower = recipeTitle.toLowerCase();

  for (const protein of MAJOR_PROTEINS) {
    if (titleLower.includes(protein)) {
      return protein;
    }
  }

  if (titleLower.includes('aloo')) return 'potato';
  if (titleLower.includes('anda')) return 'egg';
  if (titleLower.includes('murgh')) return 'chicken';

  return null;
};

/**
 * Ingredient-aware validator: ensures AI output matches normalized user ingredients.
 */
const validateRecipeMatch = (recipe, normalizedUserIngredients) => {
  if (!recipe || !recipe.recipeName) {
    console.warn('❌ [Validation Failed] Recipe response missing recipeName');
    return false;
  }

  const recipeTitle = recipe.recipeName;
  const mainProteinInTitle = extractMainProtein(recipeTitle);
  const normalizedUserList = normalizedUserIngredients.map(i => i.toLowerCase());

  // Rule A: Main protein in recipe title MUST exist in normalized user ingredients
  if (mainProteinInTitle) {
    const userHasMainProtein = normalizedUserList.some(userIng =>
      userIng.includes(mainProteinInTitle) || mainProteinInTitle.includes(userIng)
    );

    if (!userHasMainProtein) {
      console.warn(`❌ [Validation Failed] Recipe title "${recipeTitle}" specifies main protein "${mainProteinInTitle}", but user only provided:`, normalizedUserList);
      return false;
    }
  }

  // Rule B: AI ingredientsYouHave must not claim user has a major protein they did not supply
  if (recipe.ingredientsYouHave && Array.isArray(recipe.ingredientsYouHave)) {
    for (const item of recipe.ingredientsYouHave) {
      const ingName = (typeof item === 'object' ? item.name : item).toLowerCase();
      const itemProtein = extractMainProtein(ingName);
      if (itemProtein) {
        const userHasIt = normalizedUserList.some(userIng => userIng.includes(itemProtein) || itemProtein.includes(userIng));
        if (!userHasIt) {
          console.warn(`❌ [Validation Failed] AI claimed user has "${ingName}", but user did not provide "${itemProtein}"!`);
          return false;
        }
      }
    }
  }

  console.log(`✅ [Validation Passed] Recipe "${recipeTitle}" accurately matches normalized ingredients: [${normalizedUserList.join(', ')}]`);
  return true;
};

module.exports = {
  normalizeIngredient,
  normalizeIngredientsList,
  extractMainProtein,
  validateRecipeMatch
};
