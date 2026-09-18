import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChefHat, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon-sm">
              <ChefHat size={22} color="var(--accent)" />
            </div>
            <span className="logo-text">Recipe<span className="logo-accent">Flow</span></span>
          </div>
          <p className="footer-slogan">Cook smarter. Shop simpler.</p>
          <p className="footer-description">
            Your intelligent culinary companion for discovering recipes, scaling ingredients, and organizing shopping lists.
          </p>
        </div>

        <div className="footer-nav">
          <h4 className="footer-title">Navigation</h4>
          <NavLink to="/" className="footer-link">Home</NavLink>
          <NavLink to="/recipes" className="footer-link">Recipes</NavLink>
          <NavLink to="/shopping-list" className="footer-link">Shopping List</NavLink>
          <NavLink to="/ai-assistant" className="footer-link">AI Assistant</NavLink>
        </div>

        <div className="footer-nav">
          <h4 className="footer-title">Features</h4>
          <span className="footer-link-static">Dynamic Serving Scaler</span>
          <span className="footer-link-static">AI Recipe Generator</span>
          <span className="footer-link-static">Ingredient Substitutions</span>
          <span className="footer-link-static">Offline Local Storage</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>© {new Date().getFullYear()} RecipeFlow. Built with React & Node.js.</p>
          <p className="footer-made-with">
            Crafted for home cooks <Heart size={14} fill="var(--accent-secondary)" color="var(--accent-secondary)" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
