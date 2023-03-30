import React, { useEffect, useState } from "react";
import "./header.css";
import {
  BsFacebook,
  BsYoutube,
  BsInstagram,
  BsTwitter,
  BsLinkedin,
  BsHandbagFill,
} from "react-icons/bs";
import logoImage from "../../public/images/logo3.jpg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchFilter } from "../redux/ProductSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartItems);
  const login = useSelector((state) => state.user.userStatus.login);
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    console.log("reached here", searchValue);
    dispatch(searchFilter(searchValue));
    navigate("/products");
    setSearchValue("");
  };

  return (
    <>
      <div className="header-container">
        <div className="d-flex header-top-container row text-light justify-content-between">
          <div className="left-header py-1 col col-lg-4">
            <span className="mx-5 font-size-200 text-small">9897367455</span>
            <span className=" text-small">mystore@gmail.com </span>
          </div>
          <div className="right-header me-5 text-align-center col col-lg-6 d-flex justify-content-end">
            <span className="mx-2 py-1">
              <BsFacebook />
            </span>
            <span className="mx-2 py-1">
              <BsInstagram />
            </span>
            <span className="mx-2 py-1">
              <BsLinkedin />
            </span>
            <span className="mx-2 py-1">
              <BsTwitter />
            </span>
            <span className="mx-2 py-1">
              <BsYoutube />
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mx-5">
          <div className="header-logo">
            <NavLink to="/">
              <img src={logoImage} alt="" />
            </NavLink>
          </div>
          <div className="header-search d-flex justify-content-center ">
            <input
              className="p-1 "
              type="text"
              value={searchValue}
              placeholder="Search"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <button
              className="p-1 px-2 bg-dark text-light text-medium"
              onClick={(e) => {
                handleSearch(e);
              }}
            >
              Search
            </button>
          </div>
          <div className="header-right-section  d-flex justify-content-end">
            <NavLink
              to="/products"
              className="text-decoration-none mx-2  text-medium"
            >
              Products
            </NavLink>

            {localStorage.getItem("jwt") ? (
              <>
                <NavLink
                  to="./profile"
                  className="text-decoration-none mx-2  text-medium"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="./logout"
                  className="text-decoration-none mx-2  text-medium"
                >
                  Logout
                </NavLink>
                <NavLink
                  to="./cart"
                  className="text-decoration-none mx-2  text-medium"
                >
                  <BsHandbagFill />{" "}
                  <span id="cart-item-no">{cartItem > 0 ? cartItem : ""}</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="./register"
                  className="text-decoration-none mx-2  text-medium"
                >
                  Register
                </NavLink>

                <NavLink
                  to="./login"
                  className="text-decoration-none mx-2  text-medium"
                >
                  Login
                </NavLink>
                <NavLink
                  to="./cart"
                  className="text-decoration-none mx-2  text-medium"
                ></NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
