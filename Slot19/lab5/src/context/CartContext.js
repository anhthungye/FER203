import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload
      };
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    case 'CONFIRM_ORDER':
      return {
        ...state,
        orderConfirmed: true
      };
    case 'RESET_ORDER':
      return {
        ...state,
        orderConfirmed: false
      };
    default:
      return state;
  }
};

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    orderConfirmed: false
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    dispatch({ type: 'LOAD_CART', payload: savedCart });
    
    const savedOrder = JSON.parse(localStorage.getItem('orderConfirmed'));
    if (savedOrder) {
      dispatch({ type: 'CONFIRM_ORDER' });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.items));
    localStorage.setItem('orderConfirmed', JSON.stringify(state.orderConfirmed));
  }, [state.items, state.orderConfirmed]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    dispatch({ type: 'RESET_ORDER' });
  };

  const confirmOrder = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({ type: 'CONFIRM_ORDER' });
        resolve();
      }, 500);
    });
  };

  const payOrder = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        clearCart();
        resolve();
      }, 1000);
    });
  };

  const totalValue = state.items
    .reduce((acc, item) => acc + parseFloat(item.price) * (item.quantity || 1), 0)
    .toFixed(2);

  const totalQuantity = state.items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const value = {
    cartItems: state.items,
    orderConfirmed: state.orderConfirmed,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    confirmOrder,
    payOrder,
    totalValue,
    totalQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};