import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
 useEffect(() => {
  AOS.init({
    duration: 1000,  // Animation duration
    once: false,     // Allow animation to re-trigger when exiting and re-entering
    mirror: true,    // Reverse animation when scrolling back up
    offset: 200,     // Adjust the offset as needed
  });
}, []);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
