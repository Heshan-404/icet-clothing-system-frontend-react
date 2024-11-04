import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import StorePage from "./pages/StorePage/StorePage";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 10, // Animation duration
      once: false, // Allow animation to re-trigger when exiting and re-entering
      mirror: true, // Reverse animation when scrolling back up
      offset: 200, // Adjust the offset as needed
    }); 
     AOS.refresh();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StorePage />} />
          <Route path="/store" element={<StorePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
