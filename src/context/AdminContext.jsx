import { createContext, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { loginUser, registerUser, logoutUser } from "../services/authService";

export const AuthContext = createContext(null);

let accessToken = null;

export const getAccessToken = () => accessToken;
export const setAccessToken = (token) => { accessToken = token; };

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
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      setAccessToken(data.data.accessToken);
      setUser(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      toast.success(`Welcome back, ${data.data.user.name}! 👋`);
      return { success: true };
    } catch (error) {
      toast.error(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      const data = await registerUser(name, email, password);
      setAccessToken(data.data.accessToken);
      setUser(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      toast.success(`Welcome, ${data.data.user.name}! 🎉`);
      return { success: true };
    } catch (error) {
      toast.error(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutUser();
    } catch {
      // حتى لو الـ API فشلت، بنعمل logout محلياً
    } finally {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("user");
      toast("Logged out successfully", { icon: "👋" });
      setLoading(false);
    }
  }, []);

  const value = { user, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};