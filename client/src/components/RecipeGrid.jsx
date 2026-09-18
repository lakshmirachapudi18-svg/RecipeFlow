import React from 'react';
import RecipeCard from './RecipeCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import './RecipeGrid.css';

const RecipeGrid = ({ recipes, loading, emptyMessage }) => {
  if (loading) {
    return (
      <div className="recipe-grid">
        {[1, 2, 3, 4, 5, 6].map(n => (
          <SkeletonCard key={n} />
        ))}
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <EmptyState
        title="No recipes found"
        message={emptyMessage || "Try tweaking your search keywords or clearing active filters."}
      />
    );
  }

  return (
    <div className="recipe-grid animate-fade-in">
      {recipes.map(recipe => (
        <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
