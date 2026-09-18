import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ChefHat, ShoppingBag, Sparkles, Sun, Moon, Menu, X, BookOpen, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useShoppingList } from '../context/ShoppingListContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useShoppingList();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMobileNavClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <NavLink to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="logo-icon">
            <ChefHat size={26} color="var(--accent)" />
          </div>
          <span className="logo-text">Recipe<span className="logo-accent">Flow</span></span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="navbar-links desktop-only">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/recipes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Recipes
          </NavLink>
          <NavLink to="/shopping-list" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Shopping List
            {totalItems > 0 && <span className="nav-badge">{totalItems}</span>}
          </NavLink>
          <NavLink to="/ai-assistant" className={({ isActive }) => `nav-link nav-link-ai ${isActive ? 'active' : ''}`}>
            <Sparkles size={16} className="ai-icon-sparkle" />
            AI Assistant
          </NavLink>
        </nav>

        {/* Actions & Theme Toggle */}
        <div className="navbar-actions">
          {/* Shopping Cart Quick Icon */}
          <NavLink to="/shopping-list" className="cart-action-btn" title="View Shopping List">
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="cart-counter">{totalItems}</span>}
          </NavLink>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <Moon size={20} className="theme-icon moon-icon" />
            ) : (
              <Sun size={20} className="theme-icon sun-icon" />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn mobile-only"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="mobile-drawer-links">
            <button onClick={() => handleMobileNavClick('/')} className="mobile-nav-item">
              <Home size={20} />
              <span>Home</span>
            </button>
            <button onClick={() => handleMobileNavClick('/recipes')} className="mobile-nav-item">
              <BookOpen size={20} />
              <span>Recipes</span>
            </button>
            <button onClick={() => handleMobileNavClick('/shopping-list')} className="mobile-nav-item">
              <ShoppingBag size={20} />
              <span>Shopping List</span>
              {totalItems > 0 && <span className="mobile-badge">{totalItems}</span>}
            </button>
            <button onClick={() => handleMobileNavClick('/ai-assistant')} className="mobile-nav-item mobile-ai-item">
              <Sparkles size={20} />
              <span>AI Assistant</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
