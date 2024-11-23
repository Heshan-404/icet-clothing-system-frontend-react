import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HomePage from "./pages/UserPages/HomePage/HomePage";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import StorePage from "./pages/UserPages/StorePage/StorePage";
import LoginPage from "./pages/UserPages/LoginPage/LoginPage";
import OrderSuccessAlert from "./components/UserPages/alerts/OrderSuccessAlert";
import LogOutPage from "./pages/UserPages/LogOutPage/LogOutPage";
import AdminLogin from "./pages/AdminPages/LoginPage/AdminLogin";
import DashBoardPage from "./pages/AdminPages/Dashboard/DashBoardPage";
import ProductRegister from "./components/UserPages/StorePage/ProductRegister";
import MainCategoryPage from "./pages/UserPages/MainCategoryPage/MainCategoryPage";

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
          <Route path="/store" element={<StorePage isProduct={false} />} />
          <Route
            path="/store/category/:catId"
            element={<StorePage isProduct={false} />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/user-login" element={<LoginPage />} />
          <Route path="/user-logout" element={<LogOutPage />} />
          <Route path="/order-success" element={<OrderSuccessAlert />} />
          <Route
            path="/store/product/:productId"
            element={<StorePage isProduct={true} />}
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<DashBoardPage />} />
          <Route path="/admin/product/register" element={<ProductRegister />} />
          <Route
            path="/category/:mainCategory"
            element={<MainCategoryPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
