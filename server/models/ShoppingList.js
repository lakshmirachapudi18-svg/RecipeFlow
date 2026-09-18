const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  item: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, default: 1 },
  unit: { type: String, default: '' },
  purchased: { type: Boolean, default: false },
  recipeSource: { type: String, default: 'Custom' },
  recipeId: { type: String, default: null }
}, {
  timestamps: true
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);
