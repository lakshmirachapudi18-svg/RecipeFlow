import React from 'react';
import { Loader2 } from 'lucide-react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const pixelSize = size === 'sm' ? 18 : size === 'lg' ? 36 : 24;

  return (
    <div className={`spinner-wrapper ${className}`}>
      <Loader2 size={pixelSize} className="animate-spin spinner-icon" />
    </div>
  );
};

export default LoadingSpinner;
