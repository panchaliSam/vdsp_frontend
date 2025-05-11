import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@app_routes/ProtectedRoutes";

import HeroSection from "@app_pages/HeroSection";
import LoginPage from "@app_pages/Login";
import RegisterPage from "@app_pages/Register";
import NotFoundPage from "@app_pages/404";
import LoadingPage from "@app_pages/LoadingPage";
import { AdminDashboard } from "@app_pages/admin/Dashboard";
import { CustomerDashboard } from "@app_pages/customer/Dashboard";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
