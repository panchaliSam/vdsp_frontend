import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Navbar, LoadingScreen, Footer } from "./components";
import { Home, SignIn } from "./pages";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <MainApp loading={loading} />
    </Router>
  );
};

const MainApp: React.FC<{ loading: boolean }> = ({ loading }) => {
  const location = useLocation();

  const showNavbar = location.pathname !== "/login";
  const showFooter = location.pathname !== "/login";

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          {showNavbar && <Navbar />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>

          {showFooter && <Footer />}
        </div>
      )}
    </>
  );
};

export default App;
