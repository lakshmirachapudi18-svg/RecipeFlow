import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Heart, ArrowRight, Utensils } from 'lucide-react';
import { getCategoryColor, getDifficultyColor } from '../utils/helpers';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    _id,
    title,
    description,
    image,
    category,
    cuisine,
    difficulty,
    cookingTime,
    servings,
    isPopular
  } = recipe;

  const categoryStyle = getCategoryColor(category);
  const diffStyle = getDifficultyColor(difficulty);

  const handleCardClick = () => {
    navigate(`/recipes/${_id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="recipe-card card card-hover" onClick={handleCardClick}>
      {/* Image Header Container */}
      <div className="card-image-wrapper">
        {!imageError && image ? (
          <img
            src={image}
            alt={title}
            className="card-image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="card-image-placeholder">
            <Utensils size={40} className="placeholder-icon" />
            <span className="placeholder-title">{title}</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="card-badges-top">
          <span
            className="category-pill"
            style={{ backgroundColor: categoryStyle.bg, color: categoryStyle.color }}
          >
            {category}
          </span>
          {isPopular && (
            <span className="badge-popular">
              Popular 🔥
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label="Add to favorites"
          title="Save recipe"
        >
          <Heart size={18} fill={isFavorite ? '#E53935' : 'none'} color={isFavorite ? '#E53935' : 'white'} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        <div className="card-cuisine-tag">{cuisine} Cuisine</div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        {/* Metadata Footer */}
        <div className="card-meta">
          <div className="meta-item">
            <Clock size={15} />
            <span>{cookingTime}</span>
          </div>
          <div className="meta-item">
            <Users size={15} />
            <span>{servings} Servings</span>
          </div>
          <div className="meta-item difficulty-tag" style={{ color: diffStyle.color }}>
            <span>{diffStyle.label}</span>
          </div>
        </div>

        {/* Card View Button */}
        <div className="card-footer">
          <button className="view-recipe-btn">
            <span>View Recipe</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
