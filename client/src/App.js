import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Policy from "./pages/Policy.js";
import Pagenotfound from "./pages/Pagenotfound.js";
import Register from "./pages/Auth/Register.js";
import Login from "./pages/Auth/Login.js";
import Dashboard from "./pages/user/Dashboard.js";
import PrivateRoute from "./components/Routes/Private.js";
import ForgotPassword from "./pages/Auth/ForgotPassword.js";
import AdminRoute from "./components/Routes/AdminRoute.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import Users from "./pages/Admin/User.js";
import Profile from "./pages/user/Profile.js";
import Orders from "./pages/user/Orders.js";
import Products from "./pages/Admin/Products.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import Search from "./pages/Search.js";
import ProductDetails from "./pages/ProductDetails.js";
import CartPage from "./pages/CartPage.js";
import AdminOrders from "./pages/Admin/AdminOrders.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="*" element={<Pagenotfound />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="*" element={<Pagenotfound />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
