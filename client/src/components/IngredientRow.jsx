import React, { useState } from 'react';
import { Plus, Sparkles, Check } from 'lucide-react';
import './IngredientRow.css';

const IngredientRow = ({ ingredient, onAddToList, onFindSubstitute }) => {
  const { name, quantity, unit } = ingredient;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={`ingredient-row ${isChecked ? 'ingredient-checked' : ''}`}>
      {/* Checkbox Toggle */}
      <button
        onClick={() => setIsChecked(!isChecked)}
        className={`ingredient-checkbox ${isChecked ? 'checked' : ''}`}
        aria-label={`Mark ${name} as prepped`}
      >
        {isChecked && <Check size={12} color="#FFFFFF" />}
      </button>

      <div className="ingredient-info">
        <span className="ingredient-name">{name}</span>
      </div>
      
      <div className="ingredient-qty-unit">
        <span className="ingredient-qty">{quantity}</span>
        {unit && <span className="ingredient-unit">{unit}</span>}
      </div>

      <div className="ingredient-actions">
        <button
          onClick={() => onFindSubstitute(name)}
          className="btn-substitute"
          title={`Find AI substitute for ${name}`}
        >
          <Sparkles size={14} />
          <span>Substitute</span>
        </button>

        <button
          onClick={() => onAddToList(ingredient)}
          className="btn-add-single"
          title={`Add ${name} to shopping list`}
        >
          <Plus size={14} />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default IngredientRow;
