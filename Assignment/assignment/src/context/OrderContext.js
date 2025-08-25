import React, { createContext, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const createOrder = async (order) => {
    const res = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error('Failed to create order');
    return res.json();
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