import React, { useEffect } from "react";
import "./Cart.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const CartCard = ({ data, getCartData }) => {
  const { product, quant } = data;

  const handleDelete = async () => {
    console.log("reached here", product._id);
    await axios.get(`/deleteProduct/${product._id}`);
    getCartData();
  };

  // useEffect(()=>{

  // })
  return (
    <>
      <div className="card-cart-container">
        <div
          onClick={() => handleDelete()}
          className="remove-button d-flex justify-content-center align-items-center"
        >
          X
        </div>
        <div className="cart-iterm d-flex">
          <div className="cart-image col-md-3">
            <img src={product.thumbnail} alt="New 2022 from zpunet" />
          </div>
          <div className="cart-text col-md-5 d-flex align-items-center">
            <NavLink to={`/details/${product._id}`} className="cart-title">
              {product.title}
            </NavLink>
          </div>
          <div className="cart-qty col-md-2 col-sm-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
            <h6 className="h6-size">QUANTITY</h6>
            <span className="text-left">{quant}</span>
          </div>
          <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-end  d-flex flex-column justify-content-center col-sm-7">
            <h6 className="h6-size pe-3">PRICE</h6>
            <p className="h6-size mt-2 pe-3" id="font-weight">
              ${product.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
