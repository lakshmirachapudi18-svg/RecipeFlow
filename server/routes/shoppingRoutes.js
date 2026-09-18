const express = require('express');
const router = express.Router();
const {
  getShoppingList,
  addItem,
  updateItem,
  deleteItem,
  clearShoppingList
} = require('../controllers/shoppingController');

router.get('/', getShoppingList);
router.post('/', addItem);
router.delete('/clear', clearShoppingList);
router.patch('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
