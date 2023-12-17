import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children, initial = null }) => {
  const [userValue, setUserValue] = useState({ id: "" });
  const [favorites, setFavorites] = useState([]);
  const [activities, setActivities] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userValue,
        setUserValue,
        favorites,
        setFavorites,
        activities,
        setActivities,
        categoryOptions,
        setCategoryOptions,
        cityOptions,
        setCityOptions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
