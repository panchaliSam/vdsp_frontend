import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@app_routes/ProtectedRoutes";

import HeroSection from "@app_pages/HeroSection";
import LoginPage from "@app_pages/Login";
import RegisterPage from "@app_pages/Register";
import NotFoundPage from "@app_pages/404";
import LoadingPage from "@app_pages/LoadingPage";
import { AdminDashboard } from "@app_pages/admin/Dashboard";
import { CustomerDashboard } from "@app_pages/customer/Dashboard";
import { StaffDashboard } from "@app_pages/staff/Dashboard";
import { CustomerProceedPayment } from "@app_pages/customer/ProceedPayment";
import { Toaster } from "react-hot-toast";
import Gallery from "@app_pages/Gallery";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                component={AdminDashboard}
                allowedRoles={["ROLE_ADMIN"]}
              />
            }
          />
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
            element={
              <ProtectedRoute
                component={() => <Navigate to="/customer" replace />}
                allowedRoles={["ROLE_CUSTOMER"]}
              />
            }
          />
          <Route
            path="/payment/return"
            element={
              <ProtectedRoute
                component={() => <Navigate to="/customer" replace />}
                allowedRoles={["ROLE_CUSTOMER"]}
              />
            }
          />
          <Route
            path="/staff"
            element={
              <ProtectedRoute
                component={StaffDashboard}
                allowedRoles={["ROLE_STAFF"]}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
