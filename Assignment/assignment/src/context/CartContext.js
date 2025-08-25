import React, { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
  case 'LOAD':
    return { ...state, items: action.payload || [] };
  case 'ADD': {
    const existing = state.items.find(i => i.id === action.payload.id);
  if (existing) {
    return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) };
  }
    return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
  }
  case 'REMOVE':
    return { ...state, items: state.items.filter(i => i.id !== action.payload) };
  case 'INC':
    return { ...state, items: state.items.map(i => i.id === action.payload ? { ...i, qty: i.qty + 1 } : i) };
  case 'DEC':
    return { ...state, items: state.items.map(i => i.id === action.payload ? { ...i, qty: Math.max(1, i.qty - 1) } : i) };
  case 'CLEAR':
    return { ...state, items: [] };
  default:
    return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) dispatch({ type: 'LOAD', payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product) => dispatch({ type: 'ADD', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', payload: id });
  const incrementQty = (id) => dispatch({ type: 'INC', payload: id });
  const decrementQty = (id) => dispatch({ type: 'DEC', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const getCartCount = () => state.items.reduce((t, i) => t + i.qty, 0);
  const getCartSubtotal = () => state.items.reduce((t, i) => t + i.qty * (i.salePrice || i.price), 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      incrementQty,
      decrementQty,
      clearCart,
      getCartCount,
      getCartSubtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};