export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  return timeStr;
};

export const getCategoryColor = (category) => {
  switch (category) {
    case 'Vegetarian':
    case 'Vegan':
      return { bg: 'rgba(53, 107, 75, 0.12)', color: 'var(--accent)' };
    case 'Non-Vegetarian':
      return { bg: 'rgba(213, 168, 79, 0.15)', color: 'var(--accent-secondary)' };
    case 'Dessert':
    case 'Breakfast':
      return { bg: 'rgba(184, 115, 51, 0.12)', color: '#D57B4F' };
    default:
      return { bg: 'var(--surface-secondary)', color: 'var(--text-secondary)' };
  }
};

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return { color: '#2E7D32', label: 'Easy' };
    case 'Medium':
      return { color: '#E65100', label: 'Medium' };
    case 'Hard':
      return { color: '#C62828', label: 'Hard' };
    default:
      return { color: 'var(--text-secondary)', label: difficulty };
  }
};
