import React from 'react';
import { useToast } from '../context/ToastContext';
import '../styles/Toast.css';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type} show`}>
          <div className="toast-message">{toast.message}</div>
          <button 
            className="toast-close" 
            onClick={() => removeToast(toast.id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
