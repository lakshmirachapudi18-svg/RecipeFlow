import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import './EmptyState.css';

const EmptyState = ({ title = "No items found", message = "Try searching for something else or adjusting your filters.", icon: CustomIcon, action }) => {
  const Icon = CustomIcon || UtensilsCrossed;

  return (
    <div className="empty-state-box animate-fade-in">
      <div className="empty-icon-circle">
        <Icon size={32} className="empty-icon" />
      </div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-message">{message}</p>
      {action && <div className="empty-action">{action}</div>}
    </div>
  );
};

export default EmptyState;
