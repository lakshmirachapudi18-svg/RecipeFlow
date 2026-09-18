const OPENROUTER_SYSTEM_PROMPT = `You are RecipeFlow's expert cooking assistant.

CRITICAL HARD CONSTRAINTS:
1. USER INGREDIENTS ARE AUTHORITATIVE. You MUST recommend a practical recipe based ONLY on the ingredients supplied by the user.
2. The primary protein or main base ingredient of the recipe MUST come from the supplied AVAILABLE INGREDIENTS list.
3. NEVER invent or introduce major proteins or main ingredients (like poultry, meat, seafood, egg, paneer, tofu) that were NOT explicitly supplied in the user's available ingredients list.
4. Clearly separate ingredients available to the user ("ingredientsYouHave") from minor basic additional ingredients ("additionalIngredients" like salt, water, or oil).
5. Generate realistic ingredient quantities for the requested serving size.
6. Create detailed cookbook-quality cooking instructions. Each step must explain what to do, approximate cooking time, heat level when useful, and a clear doneness cue.
7. Return ONLY a single valid JSON object strictly matching the required schema. Do not include markdown code block ticks or introductory text.`;

const buildRecipePrompt = ({ ingredients, cuisine, servings, preferences }) => {
  const ingList = Array.isArray(ingredients) ? ingredients.join(', ') : ingredients;
  const targetServings = servings || 4;
  const targetCuisine = cuisine || preferences?.cuisine || 'Indian';
  const targetDiet = preferences?.diet || 'None';

  return `RECOMMEND A RECIPE BASED ON THESE EXACT INGREDIENTS:

AVAILABLE INGREDIENTS SUPPLIED BY USER:
${ingList}

TARGET SERVINGS:
${targetServings}

CUISINE PREFERENCE:
${targetCuisine}

DIETARY PREFERENCE:
${targetDiet}

CRITICAL RULES FOR GENERATION:
1. Identify the single best realistic recipe that uses as many of the AVAILABLE INGREDIENTS SUPPLIED BY USER as possible.
2. The main ingredient of the recipe MUST come from the supplied AVAILABLE INGREDIENTS list.
3. Group ingredients into:
   - "ingredientsYouHave": items provided in available ingredients used in dish.
   - "additionalIngredients": basic additional items needed (e.g. salt, water, fresh coriander).
   - "ingredients": complete list of all ingredients with quantities and prep details.
4. Provide 6 to 10 detailed cookbook-style instruction steps. Each step MUST contain:
   - "step": step number integer (1, 2, 3...)
   - "title": concise step title
   - "description": full detailed explanation of technique
   - "actions": list of action bullet strings
   - "time": duration (e.g. "8-10 mins")
   - "heat": heat level (e.g. "Medium", "High", "Low", "No heat")
   - "donenessCue": visual/sensory indicator showing step completion
5. Include food safety guidance and doneness cues for meat/poultry/fish/egg recipes where applicable.
6. Include 2-3 chef tips and 2-3 serving suggestions.

EXACT JSON SCHEMA TO RETURN (fill in values based ONLY on user's ingredients):
{
  "recipeName": "<Dish Name Based On User Ingredients>",
  "matchScore": 85,
  "usedIngredientCount": 8,
  "availableIngredientCount": 10,
  "matchReason": "<Clear explanation of why this recipe matches the user's available ingredients>",
  "servings": ${targetServings},
  "prepTime": "25 mins",
  "cookTime": "35 mins",
  "totalTime": "1 hr",
  "difficulty": "Medium",
  "cuisine": "${targetCuisine}",
  "ingredientsYouHave": [
    { "name": "<User Ingredient 1>", "quantity": "<quantity>" },
    { "name": "<User Ingredient 2>", "quantity": "<quantity>" }
  ],
  "additionalIngredients": [
    { "name": "<Basic Pantry Item>", "quantity": "<quantity>" }
  ],
  "ingredients": [
    { "name": "<User Ingredient 1>", "quantity": "<quantity with prep note>" }
  ],
  "instructions": [
    {
      "step": 1,
      "title": "<Step 1 Title>",
      "description": "<Detailed step description>",
      "actions": [
        "<Action bullet 1>",
        "<Action bullet 2>"
      ],
      "time": "10 mins",
      "heat": "Medium",
      "donenessCue": "<Sensory visual or aroma cue>"
    }
  ],
  "tips": [
    "<Practical cooking tip>"
  ],
  "servingSuggestions": [
    "<Serving suggestion bullet>"
  ]
}`;
};

const buildDishPrompt = ({ dishName, servings, cuisine }) => {
  const targetServings = servings || 4;
  const targetCuisine = cuisine || 'Any';

  return `RECOMMEND A COMPLETE RECIPE FOR THIS SPECIFIC DISH:

REQUESTED DISH NAME:
${dishName}

TARGET SERVINGS:
${targetServings}

CUISINE PREFERENCE:
${targetCuisine}

CRITICAL RULES FOR DISH SEARCH GENERATION:
1. The user is specifically requesting a recipe for "${dishName}".
2. Generate a complete, practical, authentic cookbook-quality recipe for "${dishName}".
3. Set "recipeName" to "${dishName}".
4. Do NOT recommend a different dish. Do NOT substitute main proteins.
5. Provide 6 to 10 detailed cookbook-style instruction steps with step number, title, description, actions array, time, heat level, and donenessCue.
6. Provide accurate ingredient quantities for ${targetServings} servings.
7. Set "matchScore" to 100.
8. Include 2-3 chef tips and 2-3 serving suggestions.

EXACT JSON SCHEMA TO RETURN:
{
  "recipeName": "${dishName}",
  "matchScore": 100,
  "matchReason": "Complete authentic recipe generated for ${dishName}.",
  "servings": ${targetServings},
  "prepTime": "25 mins",
  "cookTime": "35 mins",
  "totalTime": "1 hr",
  "difficulty": "Medium",
  "cuisine": "${targetCuisine}",
  "ingredientsYouHave": [
    { "name": "<Main Ingredient 1>", "quantity": "<quantity>" }
  ],
  "additionalIngredients": [],
  "ingredients": [
    { "name": "<Ingredient 1>", "quantity": "<quantity with prep note>" }
  ],
  "instructions": [
    {
      "step": 1,
      "title": "<Step 1 Title>",
      "description": "<Detailed step description>",
      "actions": [
        "<Action bullet 1>",
        "<Action bullet 2>"
      ],
      "time": "10 mins",
      "heat": "Medium",
      "donenessCue": "<Sensory visual or aroma cue>"
    }
  ],
  "tips": [
    "<Practical cooking tip>"
  ],
  "servingSuggestions": [
    "<Serving suggestion bullet>"
  ]
}`;
};

const buildSubstitutePrompt = ({ ingredient, recipeContext }) => {
  return `You are a culinary expert AI assistant.
Provide 3 practical, accessible kitchen substitutes for the specified ingredient.

INGREDIENT TO REPLACE: ${ingredient}
RECIPE CONTEXT: ${recipeContext || 'General cooking'}

Return ONLY a single valid JSON object matching this schema:
{
  "originalIngredient": "${ingredient}",
  "substitutes": [
    {
      "name": "Substitute Name",
      "recommendedQuantity": "Equal amount (1:1 ratio)",
      "explanation": "Why this replacement works and how it affects texture or flavor."
    }
  ]
}`;
};

module.exports = {
  OPENROUTER_SYSTEM_PROMPT,
  buildRecipePrompt,
  buildDishPrompt,
  buildSubstitutePrompt
};
