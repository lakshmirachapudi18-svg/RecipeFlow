import React, { createContext, useContext, useState, useEffect } from 'react';

const ShoppingListContext = createContext();

const LOCAL_STORAGE_KEY = 'recipeflow_shopping_list';

export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      return local ? JSON.parse(local) : [
        { id: '1', item: 'Basmati Rice', quantity: 2, unit: 'cups', purchased: false, recipeSource: 'Chicken Biryani' },
        { id: '2', item: 'Fresh Cream', quantity: 120, unit: 'ml', purchased: true, recipeSource: 'Butter Chicken' }
      ];
    } catch (e) {
      console.error('Failed to parse shopping list from localStorage', e);
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save shopping list to localStorage', e);
    }
  }, [items]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Smart Add Item with Deduplication / Quantity Combining
  const addItem = (itemObj) => {
    const nameToMatch = (itemObj.item || itemObj.name || '').trim().toLowerCase();
    if (!nameToMatch) return;

    setItems(prev => {
      const existingIdx = prev.findIndex(i => i.item.trim().toLowerCase() === nameToMatch && !i.purchased);
      if (existingIdx !== -1) {
        // Smart Combine
        const updated = [...prev];
        const existing = updated[existingIdx];
        const newQty = Number(existing.quantity) + (Number(itemObj.quantity) || 1);
        updated[existingIdx] = {
          ...existing,
          quantity: Math.round(newQty * 100) / 100
        };
        return updated;
      }

      const newItem = {
        id: itemObj.id || 'item_' + Date.now() + Math.random().toString(36).substring(2, 5),
        item: itemObj.item || itemObj.name,
        quantity: Number(itemObj.quantity) || 1,
        unit: itemObj.unit || '',
        purchased: false,
        recipeSource: itemObj.recipeSource || 'Custom',
        recipeId: itemObj.recipeId || null
      };
      return [newItem, ...prev];
    });

    showToast(`Added "${itemObj.item || itemObj.name}" to shopping list`);
  };

  // Smart Batch Add (Supports flat array or sectioned ingredient arrays)
  const addBatchItems = (rawIngredients, recipeTitle, recipeId) => {
    if (!rawIngredients) return;

    // Flatten sectioned ingredients if nested
    let flatList = [];
    if (Array.isArray(rawIngredients) && rawIngredients.length > 0 && rawIngredients[0].sectionTitle) {
      rawIngredients.forEach(section => {
        if (section.ingredients && Array.isArray(section.ingredients)) {
          flatList.push(...section.ingredients);
        }
      });
    } else if (Array.isArray(rawIngredients)) {
      flatList = rawIngredients;
    }

    if (flatList.length === 0) return;

    setItems(prev => {
      let currentItems = [...prev];

      flatList.forEach(ing => {
        const nameClean = (ing.name || ing.item || '').trim();
        const nameLower = nameClean.toLowerCase();
        if (!nameClean) return;

        const idx = currentItems.findIndex(i => i.item.trim().toLowerCase() === nameLower && !i.purchased);
        if (idx !== -1) {
          const existing = currentItems[idx];
          const newQty = Number(existing.quantity) + (Number(ing.quantity) || 1);
          currentItems[idx] = {
            ...existing,
            quantity: Math.round(newQty * 100) / 100
          };
        } else {
          currentItems.unshift({
            id: 'item_' + Date.now() + Math.random().toString(36).substring(2, 5),
            item: nameClean,
            quantity: Number(ing.quantity) || 1,
            unit: ing.unit || '',
            purchased: false,
            recipeSource: recipeTitle || 'Recipe',
            recipeId: recipeId || null
          });
        }
      });

      return currentItems;
    });

    showToast(`Added ${flatList.length} ingredients from "${recipeTitle}"`);
  };

  const togglePurchased = (id) => {
    setItems(prev =>
      prev.map(item =>
        (item.id === id || item._id === id) ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const updateQuantity = (id, newQuantity) => {
    const qty = Math.max(1, Number(newQuantity) || 1);
    setItems(prev =>
      prev.map(item =>
        (item.id === id || item._id === id) ? { ...item, quantity: qty } : item
      )
    );
  };

  const updateItemDetails = (id, newTitle, newQty, newUnit) => {
    setItems(prev =>
      prev.map(item =>
        (item.id === id || item._id === id)
          ? { ...item, item: newTitle, quantity: Number(newQty) || 1, unit: newUnit }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id && item._id !== id));
    showToast('Item removed from shopping list');
  };

  const clearPurchased = () => {
    const count = items.filter(i => i.purchased).length;
    setItems(prev => prev.filter(i => !i.purchased));
    if (count > 0) showToast(`Cleared ${count} purchased items`);
  };

  const clearAll = () => {
    setItems([]);
    showToast('Shopping list cleared');
  };

  const totalItems = items.length;
  const purchasedCount = items.filter(i => i.purchased).length;
  const purchasedPercentage = totalItems > 0 ? Math.round((purchasedCount / totalItems) * 100) : 0;

  return (
    <ShoppingListContext.Provider
      value={{
        items,
        totalItems,
        purchasedCount,
        purchasedPercentage,
        toastMessage,
        addItem,
        addBatchItems,
        togglePurchased,
        updateQuantity,
        updateItemDetails,
        removeItem,
        clearPurchased,
        clearAll,
        showToast
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};
