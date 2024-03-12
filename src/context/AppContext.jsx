import { createContext, useCallback, useEffect, useState } from 'react';

export const AppContext = createContext();

const getInitialState = () => {
  const localData = localStorage.getItem('favorites');

   if (!localData){
    return [];
   }
   return  JSON.parse(localData);
};

export const AppProvider =  ({ children }) => {
  const [ favorites, setFavorites] = useState (getInitialState);

  const add = useCallback(
    (pokemon) => {
    setFavorites([...favorites,pokemon.id]);
  },
  [favorites]);

  const remove = useCallback(
    (pokemon) => {
      const filtered = favorites.filter((favorite) => favorite !== pokemon.id);
      setFavorites(filtered);
    },
    [favorites]
  );

  const set = useCallback((favorites) => {
    setFavorites(favorites);
  }, []);

  useEffect (() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  },[favorites]);

  return (
    <AppContext.Provider value={{ favorites, add, remove, set}}>
      {children}
    </AppContext.Provider>
  );

};
