import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ShoppingListProvider } from './context/ShoppingListContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import ShoppingListPage from './pages/ShoppingListPage';
import AIAssistant from './pages/AIAssistant';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <ShoppingListProvider>
        <Router>
          <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipes/:id" element={<RecipeDetails />} />
                <Route path="/shopping-list" element={<ShoppingListPage />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ShoppingListProvider>
    </ThemeProvider>
  );
}

export default App;
