import React from "react";
import { CssBaseline } from "@mui/material";
import DashboardLayoutBasic from "@app_components/admin/DashboardSection";

export const AdminDashboard: React.FC = () => {
  return (
    <div>
      <CssBaseline />
      <DashboardLayoutBasic />
    </div>
  );
};
