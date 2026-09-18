import React from 'react';
import { Plus, Minus, Users } from 'lucide-react';
import './ServingSelector.css';

const ServingSelector = ({ servings, onChange, minServings = 1, maxServings = 20 }) => {
  const handleDecrement = () => {
    if (servings > minServings) {
      onChange(servings - 1);
    }
  };

  const handleIncrement = () => {
    if (servings < maxServings) {
      onChange(servings + 1);
    }
  };

  return (
    <div className="serving-selector-box">
      <div className="serving-label">
        <Users size={18} className="serving-icon" />
        <span>Servings:</span>
      </div>
      <div className="serving-controls">
        <button
          onClick={handleDecrement}
          disabled={servings <= minServings}
          className="serving-btn"
          aria-label="Decrease servings"
        >
          <Minus size={16} />
        </button>
        <span className="serving-number">{servings}</span>
        <button
          onClick={handleIncrement}
          disabled={servings >= maxServings}
          className="serving-btn"
          aria-label="Increase servings"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default ServingSelector;
