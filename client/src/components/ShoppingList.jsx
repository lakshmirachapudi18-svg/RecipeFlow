import React, { useState } from 'react';
import { Plus, Trash2, CheckSquare, ListFilter, Sparkles } from 'lucide-react';
import { useShoppingList } from '../context/ShoppingListContext';
import ShoppingItem from './ShoppingItem';
import EmptyState from './EmptyState';
import './ShoppingList.css';

const ShoppingList = () => {
  const {
    items,
    totalItems,
    purchasedCount,
    purchasedPercentage,
    addItem,
    togglePurchased,
    updateQuantity,
    updateItemDetails,
    removeItem,
    clearPurchased,
    clearAll
  } = useShoppingList();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'tobuy', 'purchased'
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemUnit, setNewItemUnit] = useState('g');

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    addItem({
      item: newItemTitle.trim(),
      quantity: newItemQty,
      unit: newItemUnit,
      recipeSource: 'Custom'
    });

    setNewItemTitle('');
    setNewItemQty(1);
  };

  // Filter items according to tab
  const filteredItems = items.filter(item => {
    if (activeTab === 'tobuy') return !item.purchased;
    if (activeTab === 'purchased') return item.purchased;
    return true;
  });

  return (
    <div className="shopping-list-container">
      {/* Top Header Card with Quick Add Input */}
      <div className="shopping-header-card card">
        <h3 className="card-section-title">Add Custom Ingredient</h3>
        <form onSubmit={handleAddItemSubmit} className="add-item-form">
          <input
            type="text"
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            placeholder="Ingredient name (e.g., Avocado, Olive Oil)..."
            className="input-item-name"
            required
          />
          <input
            type="number"
            value={newItemQty}
            onChange={(e) => setNewItemQty(e.target.value)}
            placeholder="Qty"
            className="input-item-qty"
            min="1"
          />
          <input
            type="text"
            value={newItemUnit}
            onChange={(e) => setNewItemUnit(e.target.value)}
            placeholder="Unit (g, ml, pcs)"
            className="input-item-unit"
          />
          <button type="submit" className="btn btn-primary">
            <Plus size={18} />
            <span>Add Item</span>
          </button>
        </form>
      </div>

      {/* Progress Bar Header Card */}
      {totalItems > 0 && (
        <div className="progress-card card">
          <div className="progress-text-row">
            <div className="progress-label">
              <CheckSquare size={18} className="progress-icon" />
              <span>Shopping Progress</span>
            </div>
            <span className="progress-stats font-bold">
              {purchasedPercentage}% ({purchasedCount} of {totalItems} purchased)
            </span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${purchasedPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* List Main Container Card */}
      <div className="shopping-items-card card">
        {/* Controls Bar: Filter Tabs & Bulk Actions */}
        <div className="shopping-controls-bar">
          <div className="filter-tabs">
            <button
              onClick={() => setActiveTab('all')}
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            >
              All ({totalItems})
            </button>
            <button
              onClick={() => setActiveTab('tobuy')}
              className={`tab-btn ${activeTab === 'tobuy' ? 'active' : ''}`}
            >
              To Buy ({totalItems - purchasedCount})
            </button>
            <button
              onClick={() => setActiveTab('purchased')}
              className={`tab-btn ${activeTab === 'purchased' ? 'active' : ''}`}
            >
              Purchased ({purchasedCount})
            </button>
          </div>

          <div className="bulk-actions">
            {purchasedCount > 0 && (
              <button onClick={clearPurchased} className="btn-bulk btn-bulk-clear">
                Clear Purchased
              </button>
            )}
            {totalItems > 0 && (
              <button onClick={clearAll} className="btn-bulk btn-bulk-danger">
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Item List Rows */}
        {filteredItems.length === 0 ? (
          <EmptyState
            title={activeTab === 'purchased' ? "No purchased items" : "Shopping list is empty"}
            message={
              activeTab === 'all'
                ? "Add ingredients directly from any recipe page or type a custom item above."
                : "No items match this filter tab."
            }
          />
        ) : (
          <div className="items-list-group">
            {filteredItems.map(item => (
              <ShoppingItem
                key={item.id || item._id}
                item={item}
                onToggle={togglePurchased}
                onUpdateQty={updateQuantity}
                onUpdateDetails={updateItemDetails}
                onDelete={removeItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
