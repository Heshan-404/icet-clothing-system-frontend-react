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
import AdminRegister from "./pages/AdminPages/AdminRegister/AdminRegister";
import ManageOrderPage from "./pages/AdminPages/Dashboard/MangeOrders/ManageOrderPage";
import ViewOrderPage from "./pages/AdminPages/Dashboard/MangeOrders/ViewOrderPage";

function App() {
  useEffect(() => {
    AOS.init({
      // Animation duration
      once: false, // Allow animation to re-trigger when exiting and re-entering
      mirror: true, // Adjust the offset as needed
      offset: 0,
      duration: 1000,
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
          <Route path="" element={<HomePage />} />
          <Route path="/user-login" element={<LoginPage />} />
          <Route path="/profile" element={<LogOutPage />} />
          <Route path="/order-success" element={<OrderSuccessAlert />} />
          <Route
            path="/store/product/:productId"
            element={<StorePage isProduct={true} />}
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<DashBoardPage />} />
          <Route path="/admin/product/register" element={<ProductRegister />} />
          <Route path="/admin/dashboard/admin" element={<AdminRegister />} />
          <Route path="/admin/dashboard/order" element={<ManageOrderPage />} />
          <Route path="admin/order/:orderID" element={<ViewOrderPage />} />
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
