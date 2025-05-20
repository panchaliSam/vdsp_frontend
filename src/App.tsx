import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@app_context/AuthContext";

import HeroSection from "@app_pages/HeroSection";
import LoginPage from "@app_pages/Login";
import RegisterPage from "@app_pages/Register";
import ResetPasswordPage from "@app_pages/ResetPassword";
import NotFoundPage from "@app_pages/404";
import Gallery from "@app_pages/Gallery";

import { AdminDashboard } from "@app_pages/admin/Dashboard";
import { CustomerDashboard } from "@app_pages/customer/Dashboard";
import { CustomerProceedPayment } from "@app_pages/customer/ProceedPayment";
import { StaffDashboard } from "@app_pages/staff/Dashboard";

// Protected Route Wrapper
const ProtectedRoute: React.FC<{
  component: React.FC;
  allowedRoles: string[];
}> = ({ component: Component, allowedRoles }) => {
  const { isAuthenticated, userRole, isReady } = useAuth();

  if (!isReady) return null;

  if (!isAuthenticated || !userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

const App: React.FC = () => {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                component={AdminDashboard}
                allowedRoles={["ROLE_ADMIN"]}
              />
            }
          />

          {/* Customer */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute
                component={CustomerDashboard}
                allowedRoles={["ROLE_CUSTOMER"]}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute
                component={CustomerProceedPayment}
                allowedRoles={["ROLE_CUSTOMER"]}
              />
            }
          />
          <Route
            path="/payment/cancel"
            element={<Navigate to="/customer" replace />}
          />
          <Route
            path="/payment/return"
            element={<Navigate to="/customer" replace />}
          />

          {/* Staff */}
          <Route
            path="/staff"
            element={
              <ProtectedRoute
                component={StaffDashboard}
                allowedRoles={["ROLE_STAFF"]}
              />
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;