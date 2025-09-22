import { createContext, useContext, useState } from "react";

// Create the context
const userContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <userContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

// Custom hook for easier access
export const useUserContext = () => useContext(userContext);
