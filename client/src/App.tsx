import React, { useState, useEffect } from "react";
import { Navbar, LoadingScreen, Footer } from "./components";
import { Home } from "./pages";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <Navbar />
          <div className="my-40">
            <Home />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
