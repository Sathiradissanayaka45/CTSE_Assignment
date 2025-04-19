import { createContext, useState, useEffect } from 'react';
import { login, logout, getCurrentUser, isAuthenticated as checkAuth } from '../api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkUserLoggedIn = () => {
      if (checkAuth()) {
        setUser(getCurrentUser());
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkUserLoggedIn();
  }, []);

  const loginUser = async (credentials) => {
    try {
      const data = await login(credentials);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login: loginUser,
        logout: logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
