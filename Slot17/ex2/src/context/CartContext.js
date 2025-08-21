import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    const savedOrder = JSON.parse(localStorage.getItem("orderConfirmed"));

    if (Array.isArray(savedCart)) {
      const normalized = savedCart.map(item => ({
        ...item,
        quantity: typeof item.quantity === "number" ? item.quantity : 1,
      }));
      setCartItems(normalized);
    }
    if (typeof savedDarkMode === "boolean") setDarkMode(savedDarkMode);
    if (typeof savedOrder === "boolean") setOrderConfirmed(savedOrder);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    localStorage.setItem("orderConfirmed", JSON.stringify(orderConfirmed));

    document.body.classList.toggle("dark", darkMode);
  }, [cartItems, darkMode, orderConfirmed]);

  const addToCart = (dish) => {
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.id === dish.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: (copy[idx].quantity ?? 1) + 1 };
        return copy;
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setOrderConfirmed(false);
  };

  const confirmOrder = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        setOrderConfirmed(true);
        resolve();
      }, 500);
    });

  const payOrder = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        clearCart();
        resolve();
      }, 1000);
    });

  const toggleDarkMode = () => setDarkMode(v => !v);

  const totalValue = cartItems
    .reduce((acc, item) => acc + parseFloat(item.price) * (item.quantity ?? 1), 0)
    .toFixed(2);

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        confirmOrder,
        payOrder,
        totalValue,
        darkMode,
        toggleDarkMode,
        orderConfirmed,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
