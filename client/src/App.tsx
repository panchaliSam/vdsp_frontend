import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeroSection from "@app_pages/HeroSection";
import LoginPage from "@app_pages/Login";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
