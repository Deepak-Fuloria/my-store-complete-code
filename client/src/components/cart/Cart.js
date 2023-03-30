import React, { useEffect, useState, createContext } from "react";
import "./Cart.css";
import CartCard from "./CartCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCartItems } from "../redux/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [totolquantiy, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [noOfProduct, setNoOfProducts] = useState(0);

  const getCartData = async () => {
    const { data } = await axios.get("/cart");
    

    setCartData(data);
    totalQuantity(data);
    totalprice(data);
    setNoOfProducts(data.length);
    setCartlength(data);
  };
  useEffect(() => {
    getCartData();
  }, []);
  const setCartlength = (data) => {
    dispatch(setCartItems(data.length));
  };
  const totalQuantity = (data) => {
    let total = 0;
    data.map((element) => {
      total = total + +element.quant;
    });
    setTotalQuantity(total);
  };

  const totalprice = (data) => {
    let total = 0;
    data.map((element) => {
      total = total + +(element.product.price * element.quant);
    });
    setTotalPrice(total);
  };

  return (
    <>
      <div className="cart-container mx-5">
        <div class=" alert alert-info text-center mt-3">
          Total Cart Products
          <span className="text-success mx-2">({noOfProduct})</span>
        </div>

        <div className="cart-cards">
          {cartData && cartData.length > 0
            ? cartData.map((element, i) => {
                return (
                  <CartCard
                    data={element}
                    getCartData={getCartData}
                    key={i + 1}
                  />
                );
              })
            : "Cart is empty"}
        </div>

        <div className="total d-flex justify-content-end">
          <div className="total-quantity">
            <span className="sub">total quantity:</span>
            <span className="total-price me-5">{totolquantiy}</span>
          </div>
          <div>
            <span className="sub">total price:</span>
            <span className="total-price">${totalPrice}.00</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
