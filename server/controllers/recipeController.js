const Recipe = require('../models/Recipe');
const sampleRecipes = require('../utils/seedData');
const { getIsConnected } = require('../config/db');

// In-memory recipes store for fallback
let memoryRecipes = [...sampleRecipes];

const getRecipes = async (req, res, next) => {
  try {
    const { q, category, cuisine, difficulty, isQuick, isPopular, sort } = req.query;

    if (getIsConnected()) {
      let query = {};

      if (q) {
        query.$or = [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { 'ingredients.name': { $regex: q, $options: 'i' } },
          { tags: { $regex: q, $options: 'i' } }
        ];
      }

      if (category && category !== 'All') {
        if (category === 'Vegetarian') {
          query.category = { $in: ['Vegetarian', 'Vegan'] };
        } else if (category === 'Non-Vegetarian') {
          query.category = 'Non-Vegetarian';
        } else if (category === 'Quick & Easy') {
          query.isQuick = true;
        } else {
          query.category = category;
        }
      }

      if (cuisine && cuisine !== 'All') {
        query.cuisine = cuisine;
      }

      if (difficulty && difficulty !== 'All') {
        query.difficulty = difficulty;
      }

      if (isQuick === 'true') {
        query.isQuick = true;
      }

      if (isPopular === 'true') {
        query.isPopular = true;
      }

      let sortOptions = { createdAt: -1 };
      if (sort === 'quickest') {
        sortOptions = { cookingTime: 1 };
      } else if (sort === 'popular') {
        sortOptions = { isPopular: -1 };
      }

      const recipes = await Recipe.find(query).sort(sortOptions);
      return res.json({ success: true, count: recipes.length, data: recipes });
    }

    // Fallback In-Memory Filtering
    let results = memoryRecipes;

    if (q) {
      const queryLower = q.toLowerCase();
      results = results.filter(r =>
        r.title.toLowerCase().includes(queryLower) ||
        r.description.toLowerCase().includes(queryLower) ||
        r.cuisine.toLowerCase().includes(queryLower) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(queryLower)) ||
        r.tags.some(t => t.toLowerCase().includes(queryLower))
      );
    }

    if (category && category !== 'All') {
      if (category === 'Vegetarian') {
        results = results.filter(r => r.category === 'Vegetarian' || r.category === 'Vegan');
      } else if (category === 'Non-Vegetarian') {
        results = results.filter(r => r.category === 'Non-Vegetarian');
      } else if (category === 'Quick & Easy') {
        results = results.filter(r => r.isQuick);
      } else {
        results = results.filter(r => r.category === category);
      }
    }

    if (cuisine && cuisine !== 'All') {
      results = results.filter(r => r.cuisine.toLowerCase() === cuisine.toLowerCase());
    }

    if (difficulty && difficulty !== 'All') {
      results = results.filter(r => r.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (isQuick === 'true') {
      results = results.filter(r => r.isQuick);
    }

    if (isPopular === 'true') {
      results = results.filter(r => r.isPopular);
    }

    if (sort === 'quickest') {
      results = [...results].sort((a, b) => parseInt(a.cookingTime) - parseInt(b.cookingTime));
    } else if (sort === 'popular') {
      results = [...results].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ success: false, message: 'Recipe not found' });
      }
      return res.json({ success: true, data: recipe });
    }

    const recipe = memoryRecipes.find(r => r._id === id || String(r._id) === String(id));
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    res.json({ success: true, data: recipe });
  } catch (error) {
    next(error);
  }
};

const searchRecipes = async (req, res, next) => {
  return getRecipes(req, res, next);
};

module.exports = {
  getRecipes,
  getRecipeById,
  searchRecipes
};
