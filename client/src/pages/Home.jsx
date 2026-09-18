import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Flame, Clock, Leaf, Dumbbell } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import RecipeGrid from '../components/RecipeGrid';
import useRecipes from '../hooks/useRecipes';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');

  const { recipes: popularRecipes, loading: popularLoading } = useRecipes({ isPopular: 'true' });
  const { recipes: quickRecipes, loading: quickLoading } = useRecipes({ isQuick: 'true' });
  const { recipes: vegRecipes, loading: vegLoading } = useRecipes({ category: 'Vegetarian' });

  const handleHeroSearchSubmit = (query) => {
    if (query && query.trim()) {
      navigate(`/recipes?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/recipes');
    }
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          {/* Left Text Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} className="hero-badge-sparkle" />
              <span>Smart Recipe Discovery & Shopping</span>
            </div>

            <h1 className="hero-title">
              Cook smarter.<br />
              <span className="text-accent">Shop simpler.</span>
            </h1>

            <p className="hero-subtitle">
              Discover recipes, adjust servings instantly, and build your shopping list without the clutter.
            </p>

            {/* Hero Search Input */}
            <div className="hero-search-box">
              <SearchBar
                value={heroSearch}
                onChange={setHeroSearch}
                onSearch={handleHeroSearchSubmit}
                placeholder="Search for recipes, ingredients (e.g. Chicken, Biryani, Pasta)..."
              />
            </div>

            {/* Action Buttons */}
            <div className="hero-actions">
              <button onClick={() => navigate('/recipes')} className="btn btn-primary btn-lg">
                <span>Explore Recipes</span>
                <ArrowRight size={18} />
              </button>

              <button onClick={() => navigate('/ai-assistant')} className="btn btn-accent btn-lg">
                <Sparkles size={18} />
                <span>AI Recipe Assistant</span>
              </button>
            </div>
          </div>

          {/* Right Hero Appetizing Food Imagery */}
          <div className="hero-image-container">
            <div className="hero-image-frame">
              <img
                src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=1200&auto=format&fit=crop"
                alt="Delicious Gourmet Dish"
                className="hero-main-img"
              />
              <div className="hero-floating-card top-float">
                <Flame size={20} color="var(--accent-secondary)" />
                <div>
                  <span className="float-title">Chef Curated</span>
                  <span className="float-sub">15+ Indian & Global Dishes</span>
                </div>
              </div>

              <div className="hero-floating-card bottom-float">
                <Clock size={20} color="var(--accent)" />
                <div>
                  <span className="float-title">Dynamic Scaler</span>
                  <span className="float-sub">Adjust portion sizes instantly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipe Sections */}
      <section className="featured-section container">
        {/* Popular Recipes Section */}
        <div className="section-header">
          <div>
            <div className="section-title-group">
              <Flame size={24} color="var(--accent-secondary)" />
              <h2 className="section-title">Popular Recipes</h2>
            </div>
            <p className="section-subtitle">Top-rated dishes loved by our culinary community.</p>
          </div>
          <button onClick={() => navigate('/recipes?sort=popular')} className="see-all-btn">
            <span>View All</span>
            <ArrowRight size={16} />
          </button>
        </div>
        <RecipeGrid recipes={popularRecipes.slice(0, 3)} loading={popularLoading} />

        {/* Quick & Easy Section */}
        <div className="section-header section-spacer">
          <div>
            <div className="section-title-group">
              <Clock size={24} color="var(--accent)" />
              <h2 className="section-title">Quick & Easy (Under 30 Mins)</h2>
            </div>
            <p className="section-subtitle">Fast, delicious meals ready in a flash.</p>
          </div>
          <button onClick={() => navigate('/recipes?isQuick=true')} className="see-all-btn">
            <span>View All</span>
            <ArrowRight size={16} />
          </button>
        </div>
        <RecipeGrid recipes={quickRecipes.slice(0, 3)} loading={quickLoading} />

        {/* Vegetarian Favorites */}
        <div className="section-header section-spacer">
          <div>
            <div className="section-title-group">
              <Leaf size={24} color="#2E7D32" />
              <h2 className="section-title">Vegetarian Favorites</h2>
            </div>
            <p className="section-subtitle">Wholesome, veggie-packed delights full of rich flavor.</p>
          </div>
          <button onClick={() => navigate('/recipes?category=Vegetarian')} className="see-all-btn">
            <span>View All</span>
            <ArrowRight size={16} />
          </button>
        </div>
        <RecipeGrid recipes={vegRecipes.slice(0, 3)} loading={vegLoading} />
      </section>
    </div>
  );
};

export default Home;
