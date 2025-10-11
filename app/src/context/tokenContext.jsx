import { createContext, useCallback, useContext, useState } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const getToken = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/user/refresh-token/`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setToken(data.access);
      } else {
        console.error("Failed to refresh access token");
      }
    } catch (err) {
      console.error("Error refreshing token:", err);
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken, getToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => useContext(TokenContext);
