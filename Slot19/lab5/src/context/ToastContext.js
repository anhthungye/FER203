import React, { createContext, useContext, useReducer } from 'react';

const ToastContext = createContext();

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.payload]; 
    case 'REMOVE_TOAST':
      return state.filter(toast => toast.id !== action.payload);
    default:
      return state;
  }
};

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    const toast = { id, message, type };
    dispatch({ type: 'ADD_TOAST', payload: toast });

    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
    }, duration);
  };

  const removeToast = (id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
