import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, ArrowLeft, Sparkles, ChefHat, Utensils, Package, Flame, Eye } from 'lucide-react';
import { fetchRecipeById } from '../services/recipeService';
import { scaleIngredientsList } from '../utils/ingredientScaler';
import { getCategoryColor, getDifficultyColor } from '../utils/helpers';
import { useShoppingList } from '../context/ShoppingListContext';
import ServingSelector from '../components/ServingSelector';
import IngredientList from '../components/IngredientList';
import AISubstitution from '../components/AISubstitution';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBatchItems, addItem, toastMessage } = useShoppingList();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [targetServings, setTargetServings] = useState(2);
  const [imageError, setImageError] = useState(false);

  // Substitute modal state
  const [substituteModalOpen, setSubstituteModalOpen] = useState(false);
  const [selectedIngredientForSub, setSelectedIngredientForSub] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchRecipeById(id);
      if (data) {
        setRecipe(data);
        setTargetServings(data.servings || 2);
      }
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="details-loading-container container">
        <LoadingSpinner size="lg" />
        <p>Loading complete cookbook recipe experience...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container details-error">
        <h2>Recipe not found</h2>
        <button onClick={() => navigate('/recipes')} className="btn btn-primary">
          Back to Recipes
        </button>
      </div>
    );
  }

  const categoryStyle = getCategoryColor(recipe.category);
  const diffStyle = getDifficultyColor(recipe.difficulty);

  // Scaled Ingredients: supports either ingredientSections or flat array
  const rawIngredientsData = (recipe.ingredientSections && recipe.ingredientSections.length > 0)
    ? recipe.ingredientSections
    : recipe.ingredients;

  const scaledIngredients = scaleIngredientsList(
    rawIngredientsData,
    recipe.servings,
    targetServings
  );

  const handleAddSingleIngredient = (ing) => {
    addItem({
      ...ing,
      recipeSource: recipe.title,
      recipeId: recipe._id || recipe.id
    });
  };

  const handleAddAllIngredients = () => {
    addBatchItems(scaledIngredients, recipe.title, recipe._id || recipe.id);
  };

  const handleOpenSubstituteModal = (ingName) => {
    setSelectedIngredientForSub(ingName);
    setSubstituteModalOpen(true);
  };

  return (
    <div className="recipe-details-page container animate-fade-in">
      <Toast message={toastMessage} />

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-btn">
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      {/* Hero Header Grid */}
      <div className="details-hero-grid">
        {/* Left Column: Image with Fallback */}
        <div className="details-image-card card">
          {!imageError && recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="details-img"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="details-img-placeholder">
              <Utensils size={64} className="placeholder-icon" />
              <h3 className="placeholder-title">{recipe.title}</h3>
            </div>
          )}

          <div className="details-img-badges">
            <span
              className="category-pill"
              style={{ backgroundColor: categoryStyle.bg, color: categoryStyle.color }}
            >
              {recipe.category}
            </span>
            <span className="cuisine-badge">{recipe.cuisine} Cuisine</span>
          </div>
        </div>

        {/* Right Column: Title, Metadata, Prep/Cook Times & Portions Scaler */}
        <div className="details-info-column">
          <h1 className="details-title">{recipe.title}</h1>
          <p className="details-description">{recipe.description}</p>

          {/* Times Breakdown Bar */}
          <div className="details-times-bar">
            {recipe.prepTime && (
              <div className="time-stat-box">
                <span className="time-stat-label">PREP TIME</span>
                <span className="time-stat-value">{recipe.prepTime}</span>
              </div>
            )}
            {recipe.cookTime && (
              <div className="time-stat-box">
                <span className="time-stat-label">COOK TIME</span>
                <span className="time-stat-value">{recipe.cookTime}</span>
              </div>
            )}
            <div className="time-stat-box">
              <span className="time-stat-label">TOTAL TIME</span>
              <span className="time-stat-value">{recipe.totalTime || recipe.cookingTime}</span>
            </div>
            <div className="time-stat-box">
              <span className="time-stat-label">DIFFICULTY</span>
              <span className="time-stat-value" style={{ color: diffStyle.color }}>{diffStyle.label}</span>
            </div>
          </div>

          {/* Portion Size Adjuster Box */}
          <div className="portion-scaler-card card">
            <div className="scaler-text-info">
              <h4 className="scaler-heading">Adjust Servings Portion:</h4>
              <p className="scaler-sub">Base recipe yields {recipe.servings} servings. Quantities update dynamically.</p>
            </div>
            <ServingSelector
              servings={targetServings}
              onChange={setTargetServings}
              minServings={1}
              maxServings={20}
            />
          </div>
        </div>
      </div>

      {/* Main Content Grid: Ingredients Left, Instructions & Culinary Cards Right */}
      <div className="details-content-grid">
        {/* Left Column: Ingredients Checklist */}
        <div className="details-ingredients-col">
          <IngredientList
            ingredients={scaledIngredients}
            onAddSingle={handleAddSingleIngredient}
            onAddAll={handleAddAllIngredients}
            onFindSubstitute={handleOpenSubstituteModal}
          />
        </div>

        {/* Right Column: Detailed Instructions & Additional Culinary Details */}
        <div className="details-instructions-col">
          {/* Detailed Instructions Box */}
          <div className="instructions-card card">
            <div className="instructions-header">
              <ChefHat size={26} className="chef-icon" />
              <div>
                <h3 className="instructions-title">Detailed Step-by-Step Instructions</h3>
                <span className="instructions-sub">Follow each step carefully for authentic flavor results.</span>
              </div>
            </div>

            <div className="detailed-steps-list">
              {recipe.instructions && recipe.instructions.map((stepItem, idx) => {
                const isObjectStep = typeof stepItem === 'object' && stepItem !== null;
                const stepNum = isObjectStep ? stepItem.step || stepItem.stepNumber || (idx + 1) : idx + 1;
                const stepTitle = isObjectStep ? stepItem.title : `Step ${idx + 1}`;
                const stepDesc = isObjectStep ? stepItem.description : null;
                const stepActions = isObjectStep ? stepItem.actions : [stepItem];
                const stepTime = isObjectStep ? stepItem.time : null;
                const stepHeat = isObjectStep ? stepItem.heat : null;
                const stepCue = isObjectStep ? stepItem.donenessCue : null;

                return (
                  <div key={idx} className="step-card card">
                    <div className="step-card-header">
                      <span className="step-number-badge">Step {stepNum}</span>
                      <h4 className="step-card-title">{stepTitle}</h4>
                    </div>

                    {/* Step Cues (Time, Heat, Doneness) */}
                    {(stepTime || stepHeat || stepCue) && (
                      <div className="step-cues-bar">
                        {stepTime && (
                          <span className="step-cue-tag">
                            <Clock size={12} /> {stepTime}
                          </span>
                        )}
                        {stepHeat && (
                          <span className="step-cue-tag">
                            <Flame size={12} /> {stepHeat}
                          </span>
                        )}
                        {stepCue && (
                          <span className="step-cue-tag cue-doneness">
                            <Eye size={12} /> {stepCue}
                          </span>
                        )}
                      </div>
                    )}

                    {stepDesc && <p className="step-card-description">{stepDesc}</p>}

                    {stepActions && stepActions.length > 0 && (
                      <ul className="step-actions-list">
                        {stepActions.map((act, actIdx) => (
                          <li key={actIdx} className="action-bullet">
                            <span className="bullet-dot" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chef's Pro Tips */}
          {recipe.tips && recipe.tips.length > 0 && (
            <div className="culinary-extra-card card tips-card">
              <div className="extra-card-header">
                <Sparkles size={20} className="extra-gold-icon" />
                <h4 className="extra-title">Chef's Pro Tips</h4>
              </div>
              <ul className="extra-bullet-list">
                {recipe.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Serving Suggestions */}
          {recipe.servingSuggestions && recipe.servingSuggestions.length > 0 && (
            <div className="culinary-extra-card card serving-card">
              <div className="extra-card-header">
                <Utensils size={20} className="extra-green-icon" />
                <h4 className="extra-title">Serving Suggestions</h4>
              </div>
              <ul className="extra-bullet-list">
                {recipe.servingSuggestions.map((sugg, i) => (
                  <li key={i}>{sugg}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Storage & Reheating Info */}
          {recipe.storage && recipe.storage.length > 0 && (
            <div className="culinary-extra-card card storage-card">
              <div className="extra-card-header">
                <Package size={20} className="extra-blue-icon" />
                <h4 className="extra-title">Storage & Reheating Notes</h4>
              </div>
              <ul className="extra-bullet-list">
                {recipe.storage.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* AI Ingredient Substitution Modal */}
      <AISubstitution
        isOpen={substituteModalOpen}
        onClose={() => setSubstituteModalOpen(false)}
        ingredientName={selectedIngredientForSub}
        recipeContext={recipe.title}
      />
    </div>
  );
};

export default RecipeDetails;
