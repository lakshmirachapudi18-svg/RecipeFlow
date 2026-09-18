import React from 'react';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import './FilterBar.css';

const CATEGORIES = ['All', 'Vegetarian', 'Non-Vegetarian', 'Quick & Easy'];
const CUISINES = ['All', 'Indian', 'Italian', 'Asian', 'South Indian'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];
const SORT_OPTIONS = [
  { label: 'Popularity', value: 'popular' },
  { label: 'Quickest', value: 'quickest' },
  { label: 'Newest', value: 'newest' }
];

const FilterBar = ({
  category,
  onCategoryChange,
  cuisine,
  onCuisineChange,
  difficulty,
  onDifficultyChange,
  sort,
  onSortChange,
  resultCount,
  onReset
}) => {
  const isFiltered = category !== 'All' || cuisine !== 'All' || difficulty !== 'All';

  return (
    <div className="filter-bar-container">
      {/* Category Pills Header */}
      <div className="category-pills-row">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`category-pill-btn ${category === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Secondary Controls Bar */}
      <div className="filter-controls-row">
        <div className="filter-dropdowns">
          {/* Cuisine Select */}
          <div className="select-wrapper">
            <span className="select-label">Cuisine:</span>
            <select
              value={cuisine}
              onChange={(e) => onCuisineChange(e.target.value)}
              className="filter-select"
            >
              {CUISINES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Select */}
          <div className="select-wrapper">
            <span className="select-label">Difficulty:</span>
            <select
              value={difficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="filter-select"
            >
              {DIFFICULTIES.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Sort Select */}
          <div className="select-wrapper">
            <span className="select-label">Sort By:</span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="filter-select"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters button if active */}
          {isFiltered && (
            <button onClick={onReset} className="reset-filters-btn">
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Result Counter */}
        {resultCount !== undefined && (
          <div className="result-counter-badge">
            <span>{resultCount} {resultCount === 1 ? 'recipe' : 'recipes'} found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
