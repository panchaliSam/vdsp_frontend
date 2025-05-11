import React, { createContext, useContext, useState, useEffect } from "react";
import type { Role } from "@app_interfaces/User/UserDto";

interface AuthContextType {
  userRole: Role | null;
  isAuthenticated: boolean;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userRole, setUserRole] = useState<Role | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setUserRole(savedRole as Role);
    }
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
    <AuthContext.Provider value={{ userRole, isAuthenticated, login, logout }}>
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
