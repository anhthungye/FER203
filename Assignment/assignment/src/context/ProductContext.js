import React, { createContext, useContext, useEffect, useReducer } from 'react';

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'DECREASE_STOCK':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload && p.stock > 0
            ? { ...p, stock: p.stock - 1 }
            : p
        ),
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'SET_LOADING' });
      try {
        const res = await fetch('http://localhost:5000/products');
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        dispatch({ type: 'SET_PRODUCTS', payload: data });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message || 'Unknown error' });
      }
    };
    fetchProducts();
  }, []);

  const decreaseStock = (id) => {
    dispatch({ type: 'DECREASE_STOCK', payload: id });
  };

  return (
    <ProductContext.Provider value={{ ...state, decreaseStock }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
};
