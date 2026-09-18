import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Home } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page container animate-fade-in">
      <div className="not-found-card card">
        <Utensils size={48} className="not-found-icon" />
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Recipe Not Found</h2>
        <p className="not-found-sub">
          The page or recipe you are looking for might have been moved, renamed, or eaten!
        </p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          <Home size={18} />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
