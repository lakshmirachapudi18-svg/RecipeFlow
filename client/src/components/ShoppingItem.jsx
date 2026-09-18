import React, { useState } from 'react';
import { Check, Trash2, Edit2, Save, X } from 'lucide-react';
import './ShoppingItem.css';

const ShoppingItem = ({ item, onToggle, onUpdateQty, onUpdateDetails, onDelete }) => {
  const { id, _id, item: title, quantity, unit, purchased, recipeSource } = item;
  const itemId = id || _id;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editQty, setEditQty] = useState(quantity);
  const [editUnit, setEditUnit] = useState(unit);

  const handleSave = () => {
    if (onUpdateDetails) {
      onUpdateDetails(itemId, editTitle, editQty, editUnit);
    }
    setIsEditing(false);
  };

  return (
    <div className={`shopping-item-row ${purchased ? 'purchased' : ''}`}>
      {/* Checkbox Toggle */}
      <button
        onClick={() => onToggle(itemId)}
        className={`custom-checkbox ${purchased ? 'checked' : ''}`}
        aria-label={purchased ? 'Mark as to buy' : 'Mark as purchased'}
      >
        {purchased && <Check size={14} color="#FFFFFF" />}
      </button>

      {/* Item Body / Editing Form */}
      {isEditing ? (
        <div className="item-edit-mode">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-input-title"
          />
          <input
            type="number"
            value={editQty}
            onChange={(e) => setEditQty(e.target.value)}
            className="edit-input-qty"
            min="1"
          />
          <input
            type="text"
            value={editUnit}
            onChange={(e) => setEditUnit(e.target.value)}
            className="edit-input-unit"
            placeholder="unit"
          />
          <button onClick={handleSave} className="action-btn-save" title="Save changes">
            <Save size={16} />
          </button>
          <button onClick={() => setIsEditing(false)} className="action-btn-cancel" title="Cancel edit">
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="item-view-mode">
          <div className="item-text-info">
            <span className="item-title">{title}</span>
            {recipeSource && recipeSource !== 'Custom' && (
              <span className="item-source-badge">from {recipeSource}</span>
            )}
          </div>

          <div className="item-quantity-tag">
            <span>{quantity} {unit}</span>
          </div>

          <div className="item-row-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="item-btn-edit"
              title="Edit item"
            >
              <Edit2 size={15} />
            </button>
            <button
              onClick={() => onDelete(itemId)}
              className="item-btn-delete"
              title="Delete item"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingItem;
