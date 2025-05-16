import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import App from "./App.tsx";
import { AuthProvider } from "@app_context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
