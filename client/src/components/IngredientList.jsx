import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import IngredientRow from './IngredientRow';
import './IngredientList.css';

const IngredientList = ({ ingredients, onAddSingle, onAddAll, onFindSubstitute }) => {
  // Check if ingredients is an array of section objects [{ sectionTitle, ingredients: [] }]
  const isSectioned = Array.isArray(ingredients) && ingredients.length > 0 && ingredients[0].sectionTitle;

  // Calculate total item count across all sections
  let totalCount = 0;
  if (isSectioned) {
    totalCount = ingredients.reduce((acc, sec) => acc + (sec.ingredients ? sec.ingredients.length : 0), 0);
  } else if (Array.isArray(ingredients)) {
    totalCount = ingredients.length;
  }

  return (
    <div className="ingredient-list-card card">
      {/* Header Bar */}
      <div className="ingredient-list-header">
        <div>
          <h3 className="ingredient-list-title">Ingredients Checklist</h3>
          <span className="ingredient-count-subtitle">
            {totalCount} items total
          </span>
        </div>

        <button onClick={onAddAll} className="btn btn-primary btn-sm btn-add-all">
          <ShoppingBag size={16} />
          <span>Add All to Shopping List</span>
        </button>
      </div>

      {/* Rows Container */}
      <div className="ingredient-rows-container">
        {isSectioned ? (
          ingredients.map((section, secIdx) => (
            <div key={section.sectionTitle + secIdx} className="ingredient-section-group">
              <div className="section-header-banner">
                <span className="section-header-title">{section.sectionTitle}</span>
              </div>

              {section.ingredients && section.ingredients.map((ing, idx) => (
                <IngredientRow
                  key={ing.name + idx}
                  ingredient={ing}
                  onAddToList={onAddSingle}
                  onFindSubstitute={onFindSubstitute}
                />
              ))}
            </div>
          ))
        ) : (
          Array.isArray(ingredients) && ingredients.map((ing, idx) => (
            <IngredientRow
              key={ing.name + idx}
              ingredient={ing}
              onAddToList={onAddSingle}
              onFindSubstitute={onFindSubstitute}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default IngredientList;
