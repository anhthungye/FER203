import React, { createContext, useContext, useEffect, useReducer } from 'react';

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

  const login = async (email, password, redirectAfterLogin = '/') => {
    const res = await fetch('http://localhost:5000/accounts');
    if (!res.ok) throw new Error('Cannot fetch accounts');
    const accounts = await res.json();
    const user = accounts.find(acc => acc.email === email && acc.password === password);
    if (!user) throw new Error('Invalid email or password');
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', payload: user, redirectAfterLogin });
    return user;
  };

  const register = async (payload) => {
// payload: { username, email, password, fullName, avatar, secretQuestion, answer }
    const res = await fetch('http://localhost:5000/accounts');
    if (!res.ok) throw new Error('Cannot fetch accounts');
    const accounts = await res.json();
    const nextId = accounts.length ? Math.max(...accounts.map(a => a.id)) + 1 : 1;


    const newAccount = {
      id: nextId,
      username: payload.username,
      email: payload.email,
      password: payload.password,
      fullName: payload.fullName,
      avatar: payload.avatar || payload.avatarPreview || '',
      secretQuestion: payload.secretQuestion,
      answer: payload.answer,
      wishlist: [],
      cart: [],
    };

    const createRes = await fetch('http://localhost:5000/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAccount),
    });
      if (!createRes.ok) throw new Error('Failed to register');


      localStorage.setItem('user', JSON.stringify(newAccount));
      dispatch({ type: 'LOGIN', payload: newAccount });
      return newAccount;
      };


      const logout = () => {
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
      };

      const setRedirectAfterLogin = (uri) => dispatch({ type: 'SET_REDIRECT', payload: uri });


    return (
      <AuthContext.Provider value={{
        user: state.user,
        redirectAfterLogin: state.redirectAfterLogin,
        login,
        register,
        logout,
        setRedirectAfterLogin,
      }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

  


