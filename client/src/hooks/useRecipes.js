import { useState, useEffect, useCallback } from 'react';
import { fetchRecipes } from '../services/recipeService';

export const useRecipes = (initialFilters = {}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const loadRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecipes(filters);
      setRecipes(data);
    } catch (err) {
      setError(err.message || 'Failed to load recipes');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  return {
    recipes,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    refresh: loadRecipes
  };
};

export default useRecipes;
