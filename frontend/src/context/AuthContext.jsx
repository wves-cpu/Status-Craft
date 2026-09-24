import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('statuscraft_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('statuscraft_token', token);

      // Fetch profile
      axios.get(`${API_BASE_URL}/auth/me`)
        .then(res => {
          setUser(res.data.user);
        })
        .catch(() => {
          // Token expired or invalid
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('statuscraft_token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Ошибка подключения к серверу';
      if (err.message === 'Network Error') {
        throw new Error('Не удалось подключиться к серверу API. Проверьте подключение или бэкенд URL.');
      }
      throw new Error(errorMsg);
    }
  };

  const register = async (name, email, password, shopName) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password, shopName });
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Ошибка подключения к серверу';
      if (err.message === 'Network Error') {
        throw new Error('Не удалось подключиться к серверу API. Проверьте подключение или бэкенд URL.');
      }
      throw new Error(errorMsg);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('statuscraft_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, updateUser, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
