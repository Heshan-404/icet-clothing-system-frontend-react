import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from "./pages/HomePage/HomePage";
import "./App.css" 
function App() {
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
