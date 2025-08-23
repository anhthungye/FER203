import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext';
import { ToastProvider } from './context/ToastContext';
import NavBar from './components/NavBar';
import Toast from './components/Toast';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavouritesProvider>
            <ToastProvider>
              <Router>
                <div className="App">
                  <NavBar />
                  <main className="main-content">
                    <AppRoutes />
                  </main>
                  <Toast />
                </div>
              </Router>
            </ToastProvider>
          </FavouritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;