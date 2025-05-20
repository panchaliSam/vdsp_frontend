import React, { createContext, useContext, useState, useEffect } from "react";
import { getAccessToken } from "@app_api/helper/TokenHelper";
import type { Role } from "@app_interfaces/User/UserDto";

interface AuthContextType {
  userRole: Role | null;
  isAuthenticated: boolean;
  login: (role: Role) => void;
  logout: () => void;
  isReady: boolean; // NEW: guard to prevent flicker before auth loads
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [isReady, setIsReady] = useState(false); // NEW

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    const token = getAccessToken();

    if (savedRole && token) {
      setUserRole(savedRole as Role);
    } else {
      setUserRole(null);
    }

    setIsReady(true); // Initialization complete
  }, []);

  const login = (role: Role) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem("userRole");
  };

  const isAuthenticated = userRole !== null;

  return (
    <AuthContext.Provider value={{ userRole, isAuthenticated, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};