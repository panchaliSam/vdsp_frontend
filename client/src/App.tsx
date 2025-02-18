import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Navbar, LoadingScreen, Footer } from "./components";
import { Home, SignIn, SignUp, ReservationForm } from "./pages";

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

  const hidePaths = ["/signIn", "/signUp", "/reservation"];
  const showNavbar = !hidePaths.includes(location.pathname);
  const showFooter = !hidePaths.includes(location.pathname);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          {showNavbar && <Navbar />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/reservation" element={<ReservationForm />} />
          </Routes>

          {showFooter && <Footer />}
        </div>
      )}
    </>
  );
};

export default App;
