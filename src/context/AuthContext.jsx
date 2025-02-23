import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode }  from "jwt-decode";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded)
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } 
        setUser({ id: decoded.id, name: decoded.name, email: decoded.email });

      } catch {
        logout();
      }
    }
  }, [token]);

  const register = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, formData);
      if (!res.data.token) {
        toast.error(res.data.message || "Registration failed!");
        return;
      }
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success("Registration successful!");
    } catch {
      toast.error("Registration failed!");
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, formData);
      if (!res.data.token) {
        toast.error(res.data.message || "Login failed!");
        return;
      }
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
    } catch {
      toast.error("Login failed!");
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
