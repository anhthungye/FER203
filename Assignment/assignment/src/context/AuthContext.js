import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, redirectAfterLogin: action.redirectAfterLogin || '/' };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_REDIRECT':
      return { ...state, redirectAfterLogin: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, redirectAfterLogin: '/' });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) dispatch({ type: 'LOGIN', payload: JSON.parse(savedUser) });
  }, []);

  // Đăng nhập
  const login = async (email, password, redirectAfterLogin = '/') => {
    try {
      const res = await axios.get('http://localhost:5000/accounts');
      const accounts = res.data;
      const user = accounts.find(acc => acc.email === email && acc.password === password);
      if (!user) throw new Error('Invalid email or password');
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN', payload: user, redirectAfterLogin });
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Cannot fetch accounts');
    }
  };

  // Đăng ký
  const register = async (payload) => {
    try {
      const res = await axios.get('http://localhost:5000/accounts');
      const accounts = res.data;

      const nextId = accounts.length ? Math.max(...accounts.map(a => a.id)) + 1 : 1;

      const newAccount = {
        id: nextId,
        username: payload.username,
        email: payload.email,
        password: payload.password,
        fullName: payload.fullName,
        avatar: payload.avatarPreview || '',
        secretQuestion: payload.secretQuestion,
        answer: payload.answer,
        wishlist: [],
        cart: [],
      };

      const createRes = await axios.post('http://localhost:5000/accounts', newAccount, {
        headers: { 'Content-Type': 'application/json' },
      });

      localStorage.setItem('user', JSON.stringify(createRes.data));
      dispatch({ type: 'LOGIN', payload: createRes.data });
      return createRes.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to register');
    }
  };

  // Đăng xuất
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  // Lưu lại đường dẫn cần redirect sau login
  const setRedirectAfterLogin = (uri) => dispatch({ type: 'SET_REDIRECT', payload: uri });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        redirectAfterLogin: state.redirectAfterLogin,
        login,
        register,
        logout,
        setRedirectAfterLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
