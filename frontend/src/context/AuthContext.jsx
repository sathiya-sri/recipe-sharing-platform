import { createContext, useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode}  from "jwt-decode";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

const API_URL = "http://localhost:5000/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        }
        profileDetails(decoded.id);
      } catch {
        logout();
      }
    }
  }, [token]);

  const profileDetails = async (userId) => {
    if (!userId) return;
    try {
      const res = await axios.get(`${API_URL}/users/${userId}`);

      if (!res.data.user) {
        throw new Error("No user data found!");
      }

      setProfile(res.data.user);
      console.log(res.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
    }
  };

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
    setProfile(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ profile , setProfile, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
