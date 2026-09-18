import React from 'react';
import AIRecipeAssistant from '../components/AIRecipeAssistant';
import Toast from '../components/Toast';
import { useShoppingList } from '../context/ShoppingListContext';
import './AIAssistant.css';

const AIAssistant = () => {
  const { toastMessage } = useShoppingList();

  return (
    <div className="ai-page container animate-fade-in">
      <Toast message={toastMessage} />
      <AIRecipeAssistant />
    </div>
  );
};

export default AIAssistant;
