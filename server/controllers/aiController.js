const { generateAIRecipe, generateAIDishRecipe, getAISubstitute } = require('../services/aiService');
const { normalizeIngredientsList } = require('../utils/ingredientNormalizer');
const Recipe = require('../models/Recipe');

const generateRecipe = async (req, res, next) => {
  try {
    console.log('[AI] Request received');
    const { mode, dishName, ingredients, cuisine, servings, preferences, dietaryPreference } = req.body;
    const validatedServings = Number(servings) > 0 ? Number(servings) : 4;

    const currentMode = mode || 'ingredients';
    console.log('[AI] Mode:', currentMode);

    // MODE 2: Dish Name Search
    if (currentMode === 'dish') {
      if (!dishName || typeof dishName !== 'string' || dishName.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Please enter a dish name.'
        });
      }

      const cleanDishName = dishName.trim();
      console.log('[AI] Dish Name:', cleanDishName);

      // Check if recipe exists in MongoDB catalog first
      const escaped = cleanDishName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      let catalogMatch = await Recipe.findOne({ title: { $regex: new RegExp(`^${escaped}$`, 'i') } });
      if (!catalogMatch) {
        catalogMatch = await Recipe.findOne({ title: { $regex: new RegExp(`\\b${escaped}\\b`, 'i') } });
      }

      if (catalogMatch) {
        console.log(`[AI] Recipe: ${catalogMatch.title} (Catalog Match)`);
        const formattedRecipe = {
          recipeName: catalogMatch.title,
          matchScore: 100,
          matchReason: `Matched existing RecipeFlow recipe: "${catalogMatch.title}".`,
          servings: validatedServings || catalogMatch.servings || 4,
          prepTime: catalogMatch.prepTime || catalogMatch.cookingTime || '20 mins',
          cookTime: catalogMatch.cookTime || '30 mins',
          totalTime: catalogMatch.totalTime || catalogMatch.cookingTime || '50 mins',
          difficulty: catalogMatch.difficulty || 'Medium',
          cuisine: catalogMatch.cuisine || 'Indian',
          ingredientsYouHave: [],
          additionalIngredients: [],
          ingredients: catalogMatch.ingredients.map(i => ({
            name: i.name,
            quantity: i.unit ? `${i.quantity} ${i.unit}` : `${i.quantity}`
          })),
          instructions: catalogMatch.instructions.map((inst, index) => ({
            step: inst.step || index + 1,
            stepNumber: inst.stepNumber || inst.step || index + 1,
            title: inst.title || `Step ${index + 1}`,
            description: inst.description || '',
            actions: inst.actions && inst.actions.length > 0 ? inst.actions : [inst.description || 'Follow standard preparation.'],
            time: inst.time || '',
            heat: inst.heat || '',
            donenessCue: inst.donenessCue || ''
          })),
          tips: catalogMatch.tips || [],
          servingSuggestions: catalogMatch.servingSuggestions || []
        };

        console.log('[AI] Sending response to frontend');
        return res.json({
          success: true,
          recipe: formattedRecipe,
          source: 'catalog'
        });
      }

      // Dish not in catalog -> generate via AI
      const recipe = await generateAIDishRecipe({
        dishName: cleanDishName,
        servings: validatedServings,
        cuisine: cuisine || preferences?.cuisine,
        preferences: preferences || { cuisine, diet: dietaryPreference }
      });

      console.log('[AI] Sending response to frontend');
      return res.json({
        success: true,
        recipe: recipe,
        source: 'ai'
      });
    }

    // MODE 1: Ingredients -> Recipe Recommendation
    let rawList = [];
    if (Array.isArray(ingredients)) {
      rawList = ingredients;
    } else if (typeof ingredients === 'string' && ingredients.trim() !== '') {
      rawList = ingredients.split(',');
    }

    const originalIngredients = rawList
      .map(item => (typeof item === 'string' ? item.trim() : ''))
      .filter(item => item.length > 0);

    const normalizedIngredients = normalizeIngredientsList(originalIngredients);

    if (normalizedIngredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please enter at least one ingredient.'
      });
    }

    if (normalizedIngredients.length > 35) {
      return res.status(400).json({
        success: false,
        message: 'Too many ingredients provided. Please enter up to 35 ingredients.'
      });
    }

    const recipe = await generateAIRecipe({
      ingredients: normalizedIngredients,
      originalIngredients: originalIngredients,
      cuisine: cuisine || preferences?.cuisine,
      servings: validatedServings,
      preferences: preferences || { cuisine, diet: dietaryPreference },
      dietaryPreference: dietaryPreference || preferences?.diet
    });

    console.log('[AI] Sending response to frontend');
    res.json({
      success: true,
      recipe: recipe
    });
  } catch (error) {
    console.error('[AI] Controller Error caught:', error.message);

    if (error.code === 'AI_SERVICE_ERROR') {
      return res.status(502).json({
        success: false,
        error: 'AI_SERVICE_ERROR',
        message: 'The AI service is temporarily unavailable. Please try again.'
      });
    } else if (error.code === 'AI_RESPONSE_ERROR') {
      return res.status(502).json({
        success: false,
        error: 'AI_RESPONSE_ERROR',
        message: 'The AI returned an invalid recipe response. Please try again.'
      });
    } else if (error.code === 'AI_VALIDATION_ERROR') {
      return res.status(422).json({
        success: false,
        error: 'AI_VALIDATION_ERROR',
        message: 'The AI generated a recipe that does not match the requested ingredients.'
      });
    }

    return res.status(502).json({
      success: false,
      error: 'AI_SERVICE_ERROR',
      message: error.message || 'The AI service encountered an error. Please try again.'
    });
  }
};

const findSubstitute = async (req, res, next) => {
  try {
    const { ingredient, recipeContext } = req.body;

    if (!ingredient || typeof ingredient !== 'string' || ingredient.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Ingredient name is required for substitution search.'
      });
    }

    const result = await getAISubstitute({
      ingredient: ingredient.trim(),
      recipeContext: recipeContext || ''
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('aiController findSubstitute error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unable to find ingredient substitute right now.'
    });
  }
};

module.exports = {
  generateRecipe,
  findSubstitute
};
