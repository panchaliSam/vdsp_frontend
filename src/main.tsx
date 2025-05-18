
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "@app_context/AuthContext";

createRoot(document.getElementById("root")!).render(

    <AuthProvider>
      <App />
    </AuthProvider>

);
