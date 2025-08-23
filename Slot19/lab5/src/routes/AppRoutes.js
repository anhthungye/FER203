import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Favourites from '../pages/Favourites';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;