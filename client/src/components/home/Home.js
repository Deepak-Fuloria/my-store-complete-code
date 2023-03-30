import React, { useEffect } from "react";
import HomeCard from "./HomeCard";
import "./home.css";
import {
  BsWhatsapp,
  BsFillDoorClosedFill,
  BsFillTelephoneFill,
} from "react-icons/bs";
import Carousal from "./Carousal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/ProductSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  const products = useSelector((state) => state.products.allProducts);

  let topProducts = [];

  if (products.length > 0) {
    topProducts = products.filter((element) => {
      return element.rating > 4.6;
    });
  }

  return (
    <>
      <div className="mx-5 mb-3 carosal-container">
        <Carousal />
      </div>
      <h3 className="mx-5">Our Top Products</h3>
      <div className="home-container mx-5 mt-2">
        {topProducts && topProducts.length > 0
          ? topProducts.map((element, i) => {
              return <HomeCard key={i} products={element} />;
            })
          : "loading"}
      </div>
      <div className="home-banner mt-5">
        <div>
          <h2>DO YOU WANT ANY SUGGESTIONS</h2>
          <p>Sign up free and get the latest tips</p>
          <div className="suggestion">
            <input type="text" placeholder="Your Email..." />
            <button>yes.I want</button>
          </div>
        </div>
      </div>

      <div className="contactInfo container">
        <div className="row">
          <div className="col-12 col-md-4 contact-Box ">
            <div className="box-info">
              <div className="info-image">
                <BsWhatsapp />
              </div>
              <h5>Call Us 24x7</h5>
              <p>9897367455</p>
            </div>
          </div>
          <div className="col-12 col-md-4 contact-Box">
            <div className="box-info">
              <div className="info-image">
                <BsFillDoorClosedFill />
              </div>
              <h5>Headquarter</h5>
              <p>NEW DELHI</p>
            </div>
          </div>
          <div className="col-12 col-md-4 contact-Box">
            <div className="box-info">
              <div className="info-image">
                <BsFillTelephoneFill />
              </div>
              <h5>Fax</h5>
              <p>0736 230 063</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
