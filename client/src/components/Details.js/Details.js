import React, { useEffect, useState } from "react";
import "./details.css";
import { BsCheckLg, BsFillStarFill, BsStarHalf } from "react-icons/bs";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useDispatch } from "react-redux";
// import { noOfItems } from "../redux/userSlice";

const Details = () => {
  // dispatch = useDispatch();
  const navigate = useNavigate("/");
  const [stock, setStock] = useState([]);
  const [items, setItems] = useState(1);
  const [product, setProduct] = useState();
  const { id } = useParams();
  const url = `/singleProduct/${id}`;

  const getDetails = async (url) => {
    const { data } = await axios.get(url);
    if (data) {
      setProduct(data);
      if (typeof data !== "undefined") {
        setQuantity(data.stock);
        startnum(data.rating);
      }
    }
  };

  useEffect(() => {
    getDetails(url);
  }, [url]);

  const setQuantity = (n) => {
    const quantity = [];
    n >= 15 ? (n = 15) : (n = n);
    for (let i = 0; i < n; i++) {
      quantity.push(i);
    }
    setStock(quantity);
  };

  const [stars, setStars] = useState([]);
  var noOfFullStars = 0;
  var noOfHalfStars = 0;
  const startnum = (rating) => {
    if (rating > 0) {
      noOfFullStars = Math.floor(rating);
      noOfHalfStars = Math.ceil(rating);
      const num = [];
      for (let i = 0; i < noOfFullStars; i++) {
        num.push(i);
      }
      setStars(num);
    }
  };

  const handleAddtocart = async () => {
    console.log("reached here");
    if (!localStorage.getItem("jwt")) {
      toast.warning("login first", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const data = await axios.put(`/addToCart/${id}/${items}`, {
        // withcredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // dispatch(noOfItems(items));
      navigate("/cart");
    }
  };

  return (
    <>
      {product ? (
        <div className="details-container mx-5">
          <div class="row">
            <div class="col-md-6">
              <div class="single-image">
                <img src={product.thumbnail} alt="New 2022 from zpunet" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="product-dtl">
                <div class="product-info">
                  <div class="product-name">{product.title}</div>
                </div>
                <p>{product.description}</p>
                <div class="product-count col-lg-6 ">
                  <div class="flex-box d-flex justify-content-between align-items-center">
                    <h6>Price</h6>
                    <span>${product.price}</span>
                  </div>
                  <div class="flex-box d-flex justify-content-between align-items-center">
                    <h6>Status</h6>
                    {product.stock > 0 ? (
                      <span>In Stock</span>
                    ) : (
                      <span>Out Of Stock</span>
                    )}
                  </div>
                  <div class="flex-box d-flex justify-content-between align-items-center">
                    <h6>Reviews</h6>
                    <div class="rating">
                      <div className="rating-star">
                        <div>
                          {stars && stars.length > 0
                            ? stars.map((element) => {
                                return (
                                  <BsFillStarFill className="stars margin-zero" />
                                );
                              })
                            : ""}
                          {noOfHalfStars != 0 ? (
                            <BsFillStarFill className="stars margin-zero" />
                          ) : (
                            ""
                          )}

                          <BsStarHalf className="stars" />
                        </div>
                      </div>
                      <span className="ms-2">21 reviews</span>
                    </div>
                  </div>
                  <div class="flex-box d-flex justify-content-between align-items-center">
                    <h6>Quantity</h6>

                    <select
                      onChange={(e) => {
                        setItems(e.target.value);
                      }}
                    >
                      {stock && stock.length > 0
                        ? stock.map((element) => {
                            return (
                              <option value={element + 1}>{element + 1}</option>
                            );
                          })
                        : ""}
                    </select>
                  </div>
                  <NavLink
                    onClick={() => {
                      handleAddtocart();
                    }}
                  >
                    <button class="round-black-btn">Add To Cart</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "loading"
      )}
      <ToastContainer />
    </>
  );
};

export default Details;
