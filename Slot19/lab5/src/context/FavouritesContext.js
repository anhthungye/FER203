import React, { createContext, useContext, useReducer, useEffect } from 'react';

const FavouritesContext = createContext();

const favouritesReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_FAVOURITES':
      return {
        ...state,
        items: action.payload
      };
    case 'ADD_TO_FAVOURITES':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, isFavourite: true }]
      };
    case 'REMOVE_FROM_FAVOURITES':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'CLEAR_FAVOURITES':
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
};

export const useFavourites = () => {
  return useContext(FavouritesContext);
};

export const FavouritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouritesReducer, {
    items: []
  });

  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    dispatch({ type: 'LOAD_FAVOURITES', payload: savedFavourites });
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state.items));
  }, [state.items]);

  const addToFavourites = (product) => {
    dispatch({ type: 'ADD_TO_FAVOURITES', payload: product });
  };

  const removeFromFavourites = (productId) => {
    dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: productId });
  };

  const clearFavourites = () => {
    dispatch({ type: 'CLEAR_FAVOURITES' });
  };

  const isFavourite = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const value = {
    favourites: state.items,
    addToFavourites,
    removeFromFavourites,
    clearFavourites,
    isFavourite
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};