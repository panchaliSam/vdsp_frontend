import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeroSection from "@app_pages/HeroSection";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
