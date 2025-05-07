import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeroSection from "@app_pages/HeroSection";
import LoginPage from "@app_pages/Login";
import RegisterPage from "@app_pages/Register";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
