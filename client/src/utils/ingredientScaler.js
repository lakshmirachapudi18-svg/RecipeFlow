/**
 * Scales ingredient quantity based on original vs target servings.
 * Formula: scaledQuantity = originalQuantity * targetServings / originalServings
 */
export const scaleQuantity = (originalQty, originalServings, targetServings) => {
  if (!originalQty || isNaN(originalQty)) return 0;
  if (!originalServings || originalServings <= 0) return originalQty;
  if (!targetServings || targetServings <= 0) return originalQty;

  const rawScaled = (Number(originalQty) * Number(targetServings)) / Number(originalServings);
  return Math.round(rawScaled * 100) / 100;
};

/**
 * Scales ingredientSections array preserving section headers and structure.
 */
export const scaleIngredientSections = (sections, originalServings, targetServings) => {
  if (!sections || !Array.isArray(sections)) return [];

  return sections.map(sec => ({
    ...sec,
    sectionTitle: sec.sectionTitle || 'Ingredients',
    ingredients: (sec.ingredients || []).map(ing => ({
      ...ing,
      quantity: scaleQuantity(ing.quantity, originalServings, targetServings)
    }))
  }));
};

/**
 * Scales ingredients list or sectioned ingredients list.
 */
export const scaleIngredientsList = (ingredientsData, originalServings, targetServings) => {
  if (!ingredientsData) return [];

  // If passed ingredientSections array
  if (Array.isArray(ingredientsData) && ingredientsData.length > 0 && ingredientsData[0].sectionTitle) {
    return scaleIngredientSections(ingredientsData, originalServings, targetServings);
  }

  // If simple array of ingredient objects
  if (Array.isArray(ingredientsData)) {
    return ingredientsData.map(ing => ({
      ...ing,
      quantity: scaleQuantity(ing.quantity, originalServings, targetServings)
    }));
  }

  return [];
};
