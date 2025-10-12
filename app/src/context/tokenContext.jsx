import { createContext, useCallback, useContext, useState, useEffect } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getToken = useCallback(async () => {
    try {
      // If we already have a valid token, return it
      if (token) {
        return token;
      }

      // Otherwise, try to refresh
      const newToken = await legacyRefreshToken();
      return newToken;
    } catch (err) {
      console.error("Error getting token:", err);
      return null;
    }
  }, [token]);

  // Legacy compatibility - keep this for existing code
  const legacyRefreshToken = useCallback(async () => {
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
        return data.access;
      } else {
        console.error("Failed to refresh access token");
        return null;
      }
    } catch (err) {
      console.error("Error refreshing token:", err);
      return null;
    }
  }, []);

  return (
    <TokenContext.Provider value={{ 
      token, 
      setToken, 
      getToken,
      refreshToken: legacyRefreshToken, // For backward compatibility
      isAuthenticated,
      setIsAuthenticated
    }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useTokenContext must be used within a TokenProvider");
  }
  return context;
};
