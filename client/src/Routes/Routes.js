import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Home from "../components/home/Home";
import Products from "../components/products/Products";
import Details from "../components/Details.js/Details";
import Cart from "../components/cart/Cart";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import "./routes.css";
import Logout from "../components/login/logout";
import Profile from "../components/profile/profile";
const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </>
  );
};

export default Router;
