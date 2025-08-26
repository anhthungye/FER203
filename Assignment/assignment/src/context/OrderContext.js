import React, { createContext, useContext } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const createOrder = async (order) => {
    try {
      const res = await axios.post('http://localhost:5000/orders', order, {
        headers: { 'Content-Type': 'application/json' },
      });
      return res.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  };

  return (
    <OrderContext.Provider value={{ createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
};
