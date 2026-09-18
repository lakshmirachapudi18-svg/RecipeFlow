import React from 'react';
import { CheckCircle, Info } from 'lucide-react';
import './Toast.css';

const Toast = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div className="toast-notification animate-fade-in">
      <CheckCircle size={18} className="toast-icon" />
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default Toast;
