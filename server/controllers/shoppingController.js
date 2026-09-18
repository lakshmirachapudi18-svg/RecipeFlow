const ShoppingList = require('../models/ShoppingList');
const { getIsConnected } = require('../config/db');

// In-memory fallback array for shopping list
let memoryShoppingList = [
  { _id: 'shop_1', item: 'Basmati Rice', quantity: 1, unit: 'kg', purchased: false, recipeSource: 'Chicken Biryani' },
  { _id: 'shop_2', item: 'Garlic', quantity: 1, unit: 'head', purchased: true, recipeSource: 'Pasta Arrabbiata' }
];

const getShoppingList = async (req, res, next) => {
  try {
    if (getIsConnected()) {
      const items = await ShoppingList.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: items.length, data: items });
    }

    res.json({ success: true, count: memoryShoppingList.length, data: memoryShoppingList });
  } catch (error) {
    next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const { item, quantity, unit, recipeSource, recipeId } = req.body;

    if (!item || item.trim() === '') {
      return res.status(400).json({ success: false, message: 'Item name is required' });
    }

    if (getIsConnected()) {
      const newItem = await ShoppingList.create({
        item: item.trim(),
        quantity: Number(quantity) || 1,
        unit: unit || '',
        purchased: false,
        recipeSource: recipeSource || 'Custom',
        recipeId: recipeId || null
      });
      return res.status(201).json({ success: true, data: newItem });
    }

    const newItem = {
      _id: 'shop_' + Date.now() + Math.random().toString(36).substring(2, 5),
      item: item.trim(),
      quantity: Number(quantity) || 1,
      unit: unit || '',
      purchased: false,
      recipeSource: recipeSource || 'Custom',
      recipeId: recipeId || null,
      createdAt: new Date()
    };
    memoryShoppingList.unshift(newItem);

    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { purchased, quantity, item, unit } = req.body;

    if (getIsConnected()) {
      const updated = await ShoppingList.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      return res.json({ success: true, data: updated });
    }

    const idx = memoryShoppingList.findIndex(i => i._id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    if (purchased !== undefined) memoryShoppingList[idx].purchased = Boolean(purchased);
    if (quantity !== undefined) memoryShoppingList[idx].quantity = Number(quantity);
    if (item !== undefined) memoryShoppingList[idx].item = item;
    if (unit !== undefined) memoryShoppingList[idx].unit = unit;

    res.json({ success: true, data: memoryShoppingList[idx] });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const deleted = await ShoppingList.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      return res.json({ success: true, message: 'Item deleted' });
    }

    memoryShoppingList = memoryShoppingList.filter(i => i._id !== id);
    res.json({ success: true, message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
};

const clearShoppingList = async (req, res, next) => {
  try {
    const { mode } = req.query; // 'purchased' or 'all'

    if (getIsConnected()) {
      if (mode === 'purchased') {
        await ShoppingList.deleteMany({ purchased: true });
      } else {
        await ShoppingList.deleteMany({});
      }
      return res.json({ success: true, message: 'Shopping list cleared' });
    }

    if (mode === 'purchased') {
      memoryShoppingList = memoryShoppingList.filter(i => !i.purchased);
    } else {
      memoryShoppingList = [];
    }

    res.json({ success: true, message: 'Shopping list cleared' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getShoppingList,
  addItem,
  updateItem,
  deleteItem,
  clearShoppingList
};
