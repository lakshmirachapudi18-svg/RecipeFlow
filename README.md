# RecipeFlow — Smart Recipe & Shopping Manager

> **Cook smarter. Shop simpler.**  
> A full-stack Single Page Application (SPA) for discovering recipes, dynamically scaling serving sizes, generating recipes using AI, searching dishes, and organizing shopping lists.

---

## 📌 Problem Statement

Traditional recipe websites are cluttered, ad-heavy, slow, difficult to navigate, and lack automated portion scaling or integrated shopping list management. Home cooks spend unnecessary time manually scaling ingredient quantities or writing down shopping lists on paper.

**RecipeFlow** solves these issues with:
- **Instant Search & Filtering**: Multi-criteria search (ingredients, cuisine, category, difficulty, cooking time).
- **Dynamic Serving Scaler**: Real-time ingredient math calculation (`originalQuantity * targetServings / originalServings`).
- **Persistent Shopping List**: Syncs with both `localStorage` and MongoDB persistence, with visual progress tracking and bulk actions.
- **Dual-Mode AI Assistant**: AI assistance powered by OpenRouter API (`google/gemma-4-26b-a4b-it:free`), routed securely through the Express backend.
  - **MODE 1 (Ingredients → Recipe)**: Input available kitchen ingredients to get an ingredient-bound recipe recommendation.
  - **MODE 2 (Dish Name → Recipe)**: Search any dish by name. Checks database catalog first; if found, returns clean catalog data without making redundant AI calls; if not found, generates a complete 6-step recipe.

---

## 🛠 Tech Stack

### **Frontend (`/client`)**
- **Framework**: React 18 + Vite
- **Routing**: React Router DOM v7
- **Styling**: Vanilla CSS with custom CSS variables (Design Tokens)
- **Icons**: Lucide React
- **HTTP Client**: Axios

### **Backend (`/server`)**
- **Runtime**: Node.js + Express.js REST API
- **Database**: MongoDB Atlas + Mongoose ODM
- **AI Integration**: OpenRouter API (`google/gemma-4-26b-a4b-it:free` with `openai/gpt-3.5-turbo` fallback)
- **Security & Reliability**: `helmet`, `cors`, `express-rate-limit`, central error handler

---

## 📐 System Architecture

```
                       ┌───────────────────────────────┐
                       │   React SPA Frontend (Vite)   │
                       │   - ThemeContext & CSS Tokens │
                       │   - ShoppingListContext       │
                       │   - Dynamic Serving Scaler    │
                       └───────────────┬───────────────┘
                                       │
                                   REST API
                                       │
                       ┌───────────────▼───────────────┐
                       │  Node.js + Express REST API   │
                       │  - Helmet Security & CORS     │
                       │  - Rate Limit Protection      │
                       │  - Central Error Handling     │
                       └───────┬───────────────┬───────┘
                               │               │
                  Mongoose ODM │               │ HTTP Post (Secret API Key)
                               ▼               ▼
                       ┌───────────────┐ ┌──────────────────┐
                       │ MongoDB Atlas │ │ OpenRouter Gemma │
                       └───────────────┘ └──────────────────┘
```

---

## 📂 Folder Structure

```
RecipeFlow/
├── client/
│   ├── public/
│   │   └── images/
│   │       ├── recipe-placeholder.jpg
│   │       └── recipes/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx / Navbar.css
│   │   │   ├── Footer.jsx / Footer.css
│   │   │   ├── RecipeCard.jsx / RecipeCard.css
│   │   │   ├── RecipeGrid.jsx / RecipeGrid.css
│   │   │   ├── SearchBar.jsx / SearchBar.css
│   │   │   ├── FilterBar.jsx / FilterBar.css
│   │   │   ├── IngredientList.jsx / IngredientList.css
│   │   │   ├── IngredientRow.jsx / IngredientRow.css
│   │   │   ├── ServingSelector.jsx / ServingSelector.css
│   │   │   ├── ShoppingItem.jsx / ShoppingItem.css
│   │   │   ├── ShoppingList.jsx / ShoppingList.css
│   │   │   ├── AIRecipeAssistant.jsx / AIRecipeAssistant.css
│   │   │   ├── AISubstitution.jsx / AISubstitution.css
│   │   │   ├── LoadingSpinner.jsx / LoadingSpinner.css
│   │   │   ├── SkeletonCard.jsx / SkeletonCard.css
│   │   │   ├── EmptyState.jsx / EmptyState.css
│   │   │   ├── Toast.jsx / Toast.css
│   │   │   └── Modal.jsx / Modal.css
│   │   ├── pages/
│   │   │   ├── Home.jsx / Home.css
│   │   │   ├── Recipes.jsx / Recipes.css
│   │   │   ├── RecipeDetails.jsx / RecipeDetails.css
│   │   │   ├── ShoppingListPage.jsx / ShoppingListPage.css
│   │   │   ├── AIAssistant.jsx / AIAssistant.css
│   │   │   └── NotFound.jsx / NotFound.css
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx
│   │   │   └── ShoppingListContext.jsx
│   │   ├── hooks/
│   │   │   └── useRecipes.js
│   │   ├── services/
│   │   │   ├── recipeService.js
│   │   │   └── aiService.js
│   │   ├── utils/
│   │   │   ├── ingredientScaler.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── index.html
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── recipeController.js
│   │   ├── shoppingController.js
│   │   └── aiController.js
│   ├── models/
│   │   ├── Recipe.js
│   │   └── ShoppingList.js
│   ├── routes/
│   │   ├── recipeRoutes.js
│   │   ├── shoppingRoutes.js
│   │   └── aiRoutes.js
│   ├── services/
│   │   └── aiService.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── utils/
│   │   ├── ingredientNormalizer.js
│   │   ├── prompts.js
│   │   └── seedData.js
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   └── .env
│
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- Node.js (v18.x or above)
- npm (v9.x or above)

### 1. Server Setup
```bash
cd server
npm install
```

Create a `.env` file inside `/server`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

To seed curated recipes into MongoDB:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```
*(Server will start on `http://localhost:5000`)*

### 2. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
*(Frontend will start on `http://localhost:5173`)*

---

## 📡 REST API Reference

### Health Check
- `GET /api/health` -> `{ status: "ok", timestamp: "..." }`

### Recipes (`/api/recipes`)
- `GET /api/recipes`: Fetch all recipes (supports `q`, `category`, `cuisine`, `difficulty`, `isQuick`, `isPopular`, `sort`).
- `GET /api/recipes/search?q=biryani`: Search recipes by keyword.
- `GET /api/recipes/:id`: Fetch single recipe by ID.

### Shopping List (`/api/shopping`)
- `GET /api/shopping`: Get all shopping items.
- `POST /api/shopping`: Add new item.
- `PATCH /api/shopping/:id`: Update item quantity/purchased status.
- `DELETE /api/shopping/:id`: Delete single item.
- `DELETE /api/shopping/clear?mode=purchased`: Clear purchased items or all items.

### AI Assistant (`/api/ai`)
- `POST /api/ai/generate-recipe`: Generate structured recipe (supports `mode: "ingredients"` and `mode: "dish"`).
- `POST /api/ai/substitute`: Find 3 kitchen substitutes for an ingredient.

---

## 🎨 Dual Theme System

- **Light Mode**: Background `#F7F8F3`, Surface `#FFFFFF`, Primary `#17221D`, Accent `#356B4B`, Accent Gold `#D5A84F`.
- **Dark Mode**: Background `#0B0F0E`, Surface `#121917`, Primary `#E8EDE7`, Accent `#A8C686`, Accent Gold `#D6A85F`.

Theme choice persists in `localStorage` (`recipeflow_theme`) and applies CSS variables seamlessly.

---

## 🔒 Security & Best Practices

1. **AI Key Isolation**: OpenRouter API key resides strictly inside `/server/.env` and is never exposed to the React frontend.
2. **Input Validation**: Backend normalizes spellings, sanitizes inputs, and enforces payload limits.
3. **Controlled Error Responses**: Prevents connection resets by returning explicit `502` / `422` error responses.

---

## 📜 License
MIT License. Created for RecipeFlow Application.
