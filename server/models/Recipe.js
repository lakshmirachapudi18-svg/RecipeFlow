const mongoose = require('mongoose');

const singleIngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: '' }
}, { _id: false });

const ingredientSectionSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true, default: 'Main Ingredients' },
  ingredients: [singleIngredientSchema]
}, { _id: false });

const detailedInstructionStepSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  stepNumber: { type: Number },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  actions: [{ type: String }],
  time: { type: String, default: '' },
  heat: { type: String, default: '' },
  donenessCue: { type: String, default: '' }
}, { _id: false });

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, trim: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true, enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Dessert', 'Breakfast', 'Snack'] },
  cuisine: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
  cookingTime: { type: String, required: true },
  prepTime: { type: String, default: '15 mins' },
  cookTime: { type: String, default: '30 mins' },
  totalTime: { type: String, default: '45 mins' },
  servings: { type: Number, required: true, default: 2 },
  
  ingredientSections: [ingredientSectionSchema],
  ingredients: [singleIngredientSchema],
  instructions: [detailedInstructionStepSchema],
  
  tips: [{ type: String }],
  servingSuggestions: [{ type: String }],
  storage: [{ type: String }],
  
  tags: [{ type: String }],
  isPopular: { type: Boolean, default: false },
  isQuick: { type: Boolean, default: false },
  isHighProtein: { type: Boolean, default: false }
}, {
  timestamps: true
});

recipeSchema.index({ title: 'text', description: 'text', 'ingredients.name': 'text', tags: 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);
