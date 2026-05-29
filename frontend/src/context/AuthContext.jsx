

import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

// 1. Create Context
const AuthContext = createContext();

// 2. AuthProvider Component जो पूरी Application को Wrap करेगा
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check Auth: Page refresh hone par check karega ki user already logged in hai ya nahi
  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/get-users");
      // Backend direct user object (select("-password")) bhej raha hai
      setUser(response.data); 
    } catch (err) {
      console.log("Auth verification failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login Function: Signin form se credentials lekar API hit karega
  const login = async (credentials) => {
    const response = await api.post("/auth/signin", credentials);
    // Backend login response data format: data: { _id, name, role }
    setUser(response.data.data); 
    return response;
  };

  // Logout Function: Cookies clear karne ke liye
  const logout = async () => {
    try {
      await api.post("/auth/signout");
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  // Hook to call checkAuth on initial render
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, loading, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook: Components mein Auth use karne ke liye
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};