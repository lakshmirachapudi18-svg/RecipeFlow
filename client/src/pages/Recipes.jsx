import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import RecipeGrid from '../components/RecipeGrid';
import useRecipes from '../hooks/useRecipes';
import './Recipes.css';

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [cuisine, setCuisine] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [sort, setSort] = useState('popular');

  const { recipes, loading, error, updateFilters, resetFilters } = useRecipes({
    q: searchQuery,
    category,
    cuisine,
    difficulty,
    sort
  });

  // Sync state with filters whenever inputs change
  useEffect(() => {
    updateFilters({
      q: searchQuery,
      category,
      cuisine,
      difficulty,
      sort
    });
  }, [searchQuery, category, cuisine, difficulty, sort]);

  const handleResetAll = () => {
    setSearchQuery('');
    setCategory('All');
    setCuisine('All');
    setDifficulty('All');
    setSort('popular');
    setSearchParams({});
    resetFilters();
  };

  return (
    <div className="recipes-page container animate-fade-in">
      {/* Page Header */}
      <div className="recipes-header">
        <h1 className="recipes-page-title">Explore Recipes</h1>
        <p className="recipes-page-subtitle">Find your next favorite dish from our curated collection.</p>

        {/* Search Bar */}
        <div className="recipes-search-wrapper">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search recipes, ingredients, tags..."
          />
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        category={category}
        onCategoryChange={setCategory}
        cuisine={cuisine}
        onCuisineChange={setCuisine}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        sort={sort}
        onSortChange={setSort}
        resultCount={recipes.length}
        onReset={handleResetAll}
      />

      {/* Recipe Grid Results */}
      <RecipeGrid recipes={recipes} loading={loading} />
    </div>
  );
};

export default Recipes;
