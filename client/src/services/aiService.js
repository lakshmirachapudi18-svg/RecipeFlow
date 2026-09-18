import axios from 'axios';

export const generateAIRecipe = async (payload) => {
  try {
    const mode = payload.mode || 'ingredients';
    let requestBody = {
      mode: mode,
      servings: payload.servings || 4,
      preferences: {
        cuisine: payload.cuisine || 'Indian',
        diet: payload.dietaryPreference || 'None'
      },
      cuisine: payload.cuisine,
      dietaryPreference: payload.dietaryPreference
    };

    if (mode === 'dish') {
      if (!payload.dishName || typeof payload.dishName !== 'string' || !payload.dishName.trim()) {
        throw new Error('Please enter a dish name.');
      }
      requestBody.dishName = payload.dishName.trim();
    } else {
      // Process input ingredients into clean array format before sending to backend
      let ingredientsArray = [];
      if (Array.isArray(payload.ingredients)) {
        ingredientsArray = payload.ingredients;
      } else if (typeof payload.ingredients === 'string') {
        ingredientsArray = payload.ingredients.split(',').map(s => s.trim()).filter(Boolean);
      }

      if (ingredientsArray.length === 0) {
        throw new Error('Please enter at least one ingredient.');
      }
      requestBody.ingredients = ingredientsArray;
    }

    const res = await axios.post('/api/ai/generate-recipe', requestBody);

    if (res.data && res.data.success) {
      return res.data.recipe || res.data.data;
    }

    throw new Error(res.data?.message || "We couldn't generate a recipe right now. Please try again.");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    if (error.message === 'Please enter at least one ingredient.' || error.message === 'Please enter a dish name.') {
      throw new Error(error.message);
    }
    throw new Error('Unable to connect to the recipe assistant. Please check your connection and try again.');
  }
};

export const fetchAISubstitute = async (ingredient, recipeContext = '') => {
  try {
    const res = await axios.post('/api/ai/substitute', { ingredient, recipeContext });
    if (res.data && res.data.data) {
      return res.data.data;
    }
    throw new Error(res.data?.message || 'Failed to find substitute');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Unable to connect to AI server.');
  }
};
