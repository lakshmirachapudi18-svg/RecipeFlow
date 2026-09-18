const express = require('express');
const router = express.Router();
const { getRecipes, getRecipeById, searchRecipes } = require('../controllers/recipeController');

router.get('/', getRecipes);
router.get('/search', searchRecipes);
router.get('/:id', getRecipeById);

module.exports = router;
