import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/User/HomePage/HomePage";
import UserLayout from "./Layout/UserLayout";
import ProductPage from "./pages/User/ProductsPage/ProductPage";
import FeaturedPage from "./pages/User/FeaturedPage/FeaturedPage";
import SingleProductPage from "./pages/User/SingleProductPage/SingleProductPage";
import CartPage from "./pages/User/CartPage/CartPage";
import CreateAccountPage from "./pages/User/CreateAccountPage/CreateAccountPage";
import LoginPage from "./pages/User/LoginPage/LoginPage";
import MyAccountPage from "./pages/User/MyAccountPage/MyAccountPage";
import BlogPage from "./pages/User/BlogPage/BlogPage";
import SingleBlogPage from "./pages/User/SingleBlogPage/SingleBlogPage";
import CheckoutPage from "./pages/User/CheckoutPage/CheckoutPage";
import AdminLoginPage from "./pages/Admin/AdminLoginPage/AdminLoginPage";
import AdminAuthentication from "./ProtectedRoutes/AdminAuthentication";
import AdminLayout from "./Layout/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import ProductsDetailsPage from "./pages/Admin/ProductsDetailsPage/ProductsDetailsPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import CatagoryDetailsPage from "./pages/Admin/CatagoryDetailsPage/CatagoryDetailsPage";
import AddProductPage from "./pages/Admin/AddProductPage/AddProductPage";
import UserDetailsPage from "./pages/Admin/UserDetailsPage/UserDetailsPage";
import AboutUsDetailsPage from "./pages/Admin/AboutUsDetailsPage/AboutUsDetailsPage";
import BlogDetailsPage from "./pages/Admin/BlogDetailsPage/BlogDetailsPage";
import BannerDetailsPage from "./pages/Admin/BannerDetailsPage/BannerDetailsPage";
import PostNewBlogPage from "./pages/Admin/PostNewBlogPage/PostNewBlogPage";
import { CartProvider } from "./Context/CartContext/CartContext";
import CancelPage from "./pages/User/CancelPage/CancelPage";
import SucessPage from "./pages/User/SucessPage/SucessPage";
import { useEffect, useState } from "react";
import OrderDetailsPage from "./pages/Admin/OrderDetailsPage/OrderDetailsPage";
import EditProductPage from "./pages/Admin/EditProductPage/EditProductPage";
import EditBlogPage from "./pages/Admin/EditBlogPage/EditBlogPage";
import BannerFormCard from "./components/Admin/BannerFormCard/BannerFormCard";
import ResetPasswordPage from "./pages/User/ResetPasswordPage/ResetPasswordPage";
import AboutUspage from "./pages/User/AboutUspage/AboutUspage";

function isUserLoggedIn() {
  const token = localStorage.getItem("UserToken");
  if (token) {
    return true;
  } else {
    return false;
  }
}

function PrivateRoute({ element }) {
  if (isUserLoggedIn()) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
}


function App() {


  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/single-product" element={<SingleProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/crete-account" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my-account" element={<MyAccountPage />} />
          <Route path="/Blog" element={<BlogPage />} />
          <Route path="/single-blog" element={<SingleBlogPage />} />
          <Route path="/sucess-page" element={<SucessPage />} />
          <Route path="/cancel-page" element={<CancelPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/about-us" element={<AboutUspage />} />

          <Route
            path="/checkout"
            element={<PrivateRoute element={<CheckoutPage />} />}
          />
        </Route>
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminAuthentication />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="product-details" element={<ProductsDetailsPage />} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="catagory-details" element={<CatagoryDetailsPage />} />
            <Route path="users-details" element={<UserDetailsPage />} />
            <Route path="banner-details" element={<BannerDetailsPage />} />
            <Route path="blog-details" element={<BlogDetailsPage />} />
            <Route path="blgoform" element={<EditBlogPage />} />
            <Route path="post-new-blog" element={<PostNewBlogPage />} />
            <Route path="about-us" element={<AboutUsDetailsPage />} />
            <Route path="order" element={<OrderDetailsPage />} />
            <Route path="editform" element={<EditProductPage />} />
            <Route path="new-banner" element={<BannerFormCard />} />

            
        </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
