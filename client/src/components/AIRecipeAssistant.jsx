import React, { useState } from 'react';
import {
  Sparkles, Clock, Users, ShoppingBag, Plus, RefreshCw, ChefHat, Utensils, CheckCircle, Flame, AlertCircle, Award, Compass, Search
} from 'lucide-react';
import { generateAIRecipe } from '../services/aiService';
import { useShoppingList } from '../context/ShoppingListContext';
import LoadingSpinner from './LoadingSpinner';
import IngredientList from './IngredientList';
import './AIRecipeAssistant.css';

const CUISINES = ['Indian', 'Italian', 'Asian', 'Mexican', 'Mediterranean', 'American', 'Any'];
const DIETARY_OPTIONS = ['None', 'Vegetarian', 'Vegan', 'High Protein', 'Low Carb'];

const AIRecipeAssistant = () => {
  const { addItem, addBatchItems } = useShoppingList();

  const [activeMode, setActiveMode] = useState('ingredients'); // 'ingredients' | 'dish'
  const [ingredients, setIngredients] = useState('chicken, onion, tomato, ginger, garlic, green chilli, turmeric powder, chilli powder, garam masala, oil');
  const [dishName, setDishName] = useState('Chicken Biryani');
  const [cuisine, setCuisine] = useState('Indian');
  const [servings, setServings] = useState(4);
  const [dietaryPreference, setDietaryPreference] = useState('None');

  const [loading, setLoading] = useState(false);
  const [recipeResult, setRecipeResult] = useState(null);
  const [error, setError] = useState(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleGenerateSubmit = async (e) => {
    e.preventDefault();
    if (activeMode === 'dish') {
      if (!dishName.trim()) {
        setError('Please enter a dish name.');
        return;
      }
    } else {
      if (!ingredients.trim()) {
        setError('Please enter at least one ingredient.');
        return;
      }
    }

    setLoading(true);
    setError(null);
    setRecipeResult(null); // CRITICAL: Clear previous recipe result state!
    setAddedSuccess(false);

    try {
      const result = await generateAIRecipe({
        mode: activeMode,
        dishName: activeMode === 'dish' ? dishName : undefined,
        ingredients: activeMode === 'ingredients' ? ingredients : undefined,
        cuisine,
        servings,
        dietaryPreference
      });
      setRecipeResult(result);
    } catch (err) {
      setError(err.message || "We couldn't generate a recipe right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMissingToShopping = () => {
    if (!recipeResult) return;
    const itemsToAdd = recipeResult.additionalIngredients || recipeResult.missingIngredients;

    if (itemsToAdd && itemsToAdd.length > 0) {
      itemsToAdd.forEach((ing) => {
        const nameStr = typeof ing === 'object' ? ing.name : ing;
        const qtyStr = typeof ing === 'object' ? ing.quantity || '1 unit' : '1 unit';
        addItem({
          item: nameStr,
          quantity: 1,
          unit: qtyStr,
          recipeSource: `${recipeResult.recipeName || recipeResult.title} (Missing)`
        });
      });
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3500);
    }
  };

  const handleAddAllToShopping = () => {
    if (!recipeResult) return;
    const allIngs = recipeResult.ingredients || recipeResult.ingredientSections;
    if (allIngs && allIngs.length > 0) {
      addBatchItems(allIngs, recipeResult.recipeName || recipeResult.title);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3500);
    }
  };

  const recipeTitle = recipeResult?.recipeName || recipeResult?.title || 'Recommended Recipe';

  return (
    <div className="ai-assistant-container">
      {/* Input Generator Card */}
      <div className="ai-generator-card card">
        <div className="ai-card-header">
          <div className="ai-badge-header">
            <Sparkles size={18} className="sparkle-gold" />
            <span>AI Recipe Assistant</span>
          </div>

          <div className="ai-mode-toggle-container">
            <button
              type="button"
              className={`mode-toggle-btn ${activeMode === 'ingredients' ? 'active' : ''}`}
              onClick={() => {
                setActiveMode('ingredients');
                setError(null);
              }}
            >
              <Utensils size={16} />
              <span>Ingredients → Recipe</span>
            </button>
            <button
              type="button"
              className={`mode-toggle-btn ${activeMode === 'dish' ? 'active' : ''}`}
              onClick={() => {
                setActiveMode('dish');
                setError(null);
              }}
            >
              <Search size={16} />
              <span>Search Dish</span>
            </button>
          </div>

          <h2 className="ai-headline">
            {activeMode === 'ingredients' ? 'What ingredients do you have at home?' : 'What dish are you looking for?'}
          </h2>
          <p className="ai-subheadline">
            {activeMode === 'ingredients'
              ? 'Enter your available ingredients, and our AI Chef will craft a realistic, detailed recipe using what you already have in your kitchen.'
              : 'Enter any dish name (e.g. Chicken Biryani, Butter Chicken, Paneer Tikka, Mutton Curry) to search our catalog or generate authentic step-by-step instructions.'}
          </p>
        </div>

        <form onSubmit={handleGenerateSubmit} className="ai-form">
          {activeMode === 'ingredients' ? (
            <div className="form-group">
              <label className="form-label">Available Ingredients:</label>
              <textarea
                value={ingredients}
                onChange={(e) => {
                  setIngredients(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="e.g. chicken, onion, tomato, ginger, garlic, green chilli, turmeric, chilli powder, garam masala, oil..."
                rows={3}
                className="ingredients-textarea"
              />
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Dish Name:</label>
              <input
                type="text"
                value={dishName}
                onChange={(e) => {
                  setDishName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="e.g. Chicken Biryani, Butter Chicken, Paneer Tikka, Mutton Curry..."
                className="input-control"
              />
            </div>
          )}

          <div className="controls-grid">
            <div className="control-item">
              <label className="form-label-sm">Servings</label>
              <div className="servings-stepper">
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  disabled={servings <= 1}
                >
                  -
                </button>
                <span className="stepper-val">{servings}</span>
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => setServings(Math.min(12, servings + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="control-item">
              <label className="form-label-sm">Cuisine Style</label>
              <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="select-control">
                {CUISINES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {activeMode === 'ingredients' && (
              <div className="control-item">
                <label className="form-label-sm">Dietary Goal</label>
                <select value={dietaryPreference} onChange={(e) => setDietaryPreference(e.target.value)} className="select-control">
                  {DIETARY_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} className="btn btn-accent btn-lg generate-btn">
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                <span>
                  {activeMode === 'ingredients'
                    ? 'Finding the best recipe for your ingredients...'
                    : `Finding recipe for ${dishName}...`}
                </span>
              </>
            ) : (
              <>
                {activeMode === 'ingredients' ? <Sparkles size={20} /> : <Search size={20} />}
                <span>{activeMode === 'ingredients' ? 'Generate Recipe ✨' : 'Find Recipe 🔍'}</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="ai-error-banner card">
          <AlertCircle size={20} className="error-icon" />
          <p>{error}</p>
        </div>
      )}

      {/* AI Recipe Result Display */}
      {recipeResult && (
        <div className="ai-result-section animate-fade-in">
          <div className="result-card card">
            {/* Header Banner */}
            <div className="result-header">
              <div className="result-header-top">
                <div className="ai-generated-tag">
                  <Sparkles size={14} />
                  <span>{activeMode === 'dish' ? 'Recipe Search Result' : 'AI Recommended Recipe'}</span>
                </div>

                {activeMode === 'dish' || recipeResult.matchScore === 100 ? (
                  <div className="match-score-pill dish-mode-pill">
                    <Sparkles size={16} />
                    <span>{recipeResult.matchReason?.includes('RecipeFlow') ? 'Catalog Recipe' : 'AI Recipe'}</span>
                  </div>
                ) : recipeResult.matchScore !== undefined ? (
                  <div className="match-score-pill">
                    <Award size={16} />
                    <span>{recipeResult.matchScore}% Ingredient Match</span>
                  </div>
                ) : null}
              </div>

              <h2 className="result-title">{recipeTitle}</h2>

              {recipeResult.matchReason && (
                <div className="match-reason-box">
                  <strong>Why this recipe:</strong> {recipeResult.matchReason}
                </div>
              )}

              <div className="result-meta-row">
                <div className="meta-badge">
                  <Clock size={16} />
                  <span>{recipeResult.totalTime || `${recipeResult.prepTime || ''} + ${recipeResult.cookTime || ''}`}</span>
                </div>
                <div className="meta-badge">
                  <Users size={16} />
                  <span>{recipeResult.servings || servings} Servings</span>
                </div>
                {recipeResult.cuisine && <span className="meta-badge-text">{recipeResult.cuisine}</span>}
                {recipeResult.difficulty && <span className="meta-badge-text">{recipeResult.difficulty}</span>}
              </div>
            </div>

            {/* Split Ingredient Categories: You Have vs Additional Needed */}
            <div className="ingredients-split-grid">
              {/* Ingredients You Have */}
              {recipeResult.ingredientsYouHave && recipeResult.ingredientsYouHave.length > 0 && (
                <div className="ing-split-card card ing-have-card">
                  <div className="ing-card-header text-success">
                    <CheckCircle size={18} />
                    <h3>Ingredients You Have</h3>
                  </div>
                  <ul className="ing-split-list">
                    {recipeResult.ingredientsYouHave.map((ing, idx) => (
                      <li key={idx} className="ing-split-item">
                        <span className="check-icon">✓</span>
                        <span className="ing-name">{typeof ing === 'object' ? ing.name : ing}</span>
                        {ing.quantity && <span className="ing-qty">— {ing.quantity}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional Ingredients Needed */}
              {recipeResult.additionalIngredients && recipeResult.additionalIngredients.length > 0 && (
                <div className="ing-split-card card ing-need-card">
                  <div className="ing-card-header text-accent">
                    <Plus size={18} />
                    <h3>Additional Ingredients Needed</h3>
                  </div>
                  <ul className="ing-split-list">
                    {recipeResult.additionalIngredients.map((ing, idx) => (
                      <li key={idx} className="ing-split-item">
                        <span className="plus-icon">+</span>
                        <span className="ing-name">{typeof ing === 'object' ? ing.name : ing}</span>
                        {ing.quantity && <span className="ing-qty">— {ing.quantity}</span>}
                      </li>
                    ))}
                  </ul>
                  <button onClick={handleAddMissingToShopping} className="btn btn-outline btn-sm add-missing-btn">
                    <Plus size={14} /> Add Missing Ingredients to Shopping List
                  </button>
                </div>
              )}
            </div>

            {addedSuccess && (
              <div className="added-toast card">
                <CheckCircle size={16} /> Items successfully added to your shopping list!
              </div>
            )}

            {/* Content Body: Full Ingredients & Detailed Instructions */}
            <div className="result-body-grid">
              {/* Left Column: Full Ingredient Checklist */}
              <div className="result-left">
                <IngredientList
                  ingredients={recipeResult.ingredients || recipeResult.ingredientSections || []}
                  onAddSingle={(ing) => addItem({ ...ing, recipeSource: recipeTitle })}
                  onAddAll={handleAddAllToShopping}
                  onFindSubstitute={() => {}}
                />
              </div>

              {/* Right Column: Step-by-Step Instructions & Tips */}
              <div className="result-right">
                <div className="instructions-box card">
                  <div className="instructions-header">
                    <ChefHat size={24} className="chef-icon" />
                    <h3 className="section-heading">Detailed Step-by-Step Instructions</h3>
                  </div>

                  <div className="detailed-steps-list">
                    {recipeResult.instructions && recipeResult.instructions.map((step, idx) => {
                      const isObj = typeof step === 'object' && step !== null;
                      const stepNum = isObj ? step.step || step.stepNumber || (idx + 1) : idx + 1;
                      const stepTitle = isObj ? step.title : `Step ${idx + 1}`;
                      const stepDesc = isObj ? step.description : null;
                      const stepActions = isObj ? step.actions : [step];

                      return (
                        <div key={idx} className="step-card card">
                          <div className="step-card-header">
                            <span className="step-number-badge">Step {stepNum}</span>
                            <h4 className="step-card-title">{stepTitle}</h4>

                            <div className="step-meta-pills">
                              {step.heat && (
                                <span className="step-pill heat-pill">
                                  <Flame size={12} /> {step.heat}
                                </span>
                              )}
                              {step.time && (
                                <span className="step-pill time-pill">
                                  <Clock size={12} /> {step.time}
                                </span>
                              )}
                            </div>
                          </div>

                          {stepDesc && <p className="step-card-description">{stepDesc}</p>}

                          {stepActions && stepActions.length > 0 && (
                            <ul className="step-actions-list">
                              {stepActions.map((act, aIdx) => (
                                <li key={aIdx} className="action-bullet">
                                  <span className="bullet-dot" />
                                  <span>{act}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {step.donenessCue && (
                            <div className="doneness-cue-box">
                              <span className="cue-label">👀 Doneness Cue:</span> {step.donenessCue}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cooking Tips */}
                {recipeResult.tips && recipeResult.tips.length > 0 && (
                  <div className="chef-tips-box card">
                    <div className="tips-title">
                      <Sparkles size={18} className="tips-icon" />
                      <span>Chef's Cooking Tips</span>
                    </div>
                    <ul className="tips-list">
                      {recipeResult.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Serving Suggestions */}
                {recipeResult.servingSuggestions && recipeResult.servingSuggestions.length > 0 && (
                  <div className="chef-tips-box card">
                    <div className="tips-title">
                      <Utensils size={18} className="tips-icon" />
                      <span>Serving Suggestions</span>
                    </div>
                    <ul className="tips-list">
                      {recipeResult.servingSuggestions.map((sugg, i) => (
                        <li key={i}>{sugg}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Alternatives if available */}
            {recipeResult.alternatives && recipeResult.alternatives.length > 0 && (
              <div className="alternatives-section card">
                <div className="alternatives-header">
                  <Compass size={20} className="text-accent" />
                  <h3>Alternative Recipe Ideas</h3>
                </div>
                <div className="alternatives-grid">
                  {recipeResult.alternatives.map((alt, i) => (
                    <div key={i} className="alt-card card">
                      <div className="alt-title-row">
                        <h4>{alt.recipeName}</h4>
                        {alt.matchScore && <span className="alt-badge">{alt.matchScore}% match</span>}
                      </div>
                      <p className="alt-reason">{alt.shortReason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="result-actions-footer">
              <button onClick={handleAddAllToShopping} className="btn btn-primary">
                <ShoppingBag size={18} />
                <span>Add All Ingredients to Shopping List</span>
              </button>
              <button
                onClick={() => {
                  setRecipeResult(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-outline"
              >
                <RefreshCw size={18} />
                <span>Generate Another Recipe</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecipeAssistant;
