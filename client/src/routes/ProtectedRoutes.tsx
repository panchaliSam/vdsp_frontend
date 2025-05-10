import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@app_context/AuthContext";
import type { Role } from "@app_interfaces/User/UserDto";

interface ProtectedRouteProps {
  component: React.ComponentType;
  allowedRoles: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  allowedRoles,
}) => {
  const { userRole, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole!)) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
