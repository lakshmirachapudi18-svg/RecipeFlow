import React from 'react';
import ShoppingList from '../components/ShoppingList';
import Toast from '../components/Toast';
import { useShoppingList } from '../context/ShoppingListContext';
import './ShoppingListPage.css';

const ShoppingListPage = () => {
  const { toastMessage } = useShoppingList();

  return (
    <div className="shopping-page container animate-fade-in">
      <Toast message={toastMessage} />

      <div className="shopping-page-header">
        <h1 className="shopping-page-title">Shopping List</h1>
        <p className="shopping-page-subtitle">
          Keep track of your ingredients. Cook without the hassle.
        </p>
      </div>

      <ShoppingList />
    </div>
  );
};

export default ShoppingListPage;
