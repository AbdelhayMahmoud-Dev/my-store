import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const getUserFromStorage = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromStorage);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success(`Welcome back, ${userData.name}! 👋`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast("Logged out successfully", { icon: "👋" });
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};