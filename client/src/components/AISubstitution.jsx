import React, { useState, useEffect } from 'react';
import { Sparkles, X, RefreshCw, CheckCircle2 } from 'lucide-react';
import { fetchAISubstitute } from '../services/aiService';
import LoadingSpinner from './LoadingSpinner';
import Modal from './Modal';
import './AISubstitution.css';

const AISubstitution = ({ ingredientName, recipeContext, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const loadSubstitute = async () => {
    if (!ingredientName) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAISubstitute(ingredientName, recipeContext);
      setData(res);
    } catch (err) {
      setError(err.message || 'Failed to fetch AI substitutes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && ingredientName) {
      loadSubstitute();
    }
  }, [isOpen, ingredientName]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Need a substitute for ${ingredientName}?`}>
      <div className="ai-sub-modal-content">
        {loading ? (
          <div className="sub-loading">
            <LoadingSpinner size="md" />
            <p>Asking Chef AI for the best substitutes...</p>
          </div>
        ) : error ? (
          <div className="sub-error">
            <p>{error}</p>
            <button onClick={loadSubstitute} className="btn btn-outline btn-sm">
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        ) : data && data.substitutes ? (
          <div className="sub-results-container">
            <div className="sub-banner">
              <Sparkles size={18} className="ai-sparkle-icon" />
              <span>AI Recommended Alternatives</span>
            </div>

            <div className="substitutes-list">
              {data.substitutes.map((sub, idx) => (
                <div key={idx} className="substitute-card card">
                  <div className="sub-card-header">
                    <CheckCircle2 size={18} className="sub-check-icon" />
                    <h4 className="sub-name">{sub.name}</h4>
                    <span className="sub-qty-badge">{sub.recommendedQuantity}</span>
                  </div>
                  <p className="sub-explanation">{sub.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default AISubstitution;
