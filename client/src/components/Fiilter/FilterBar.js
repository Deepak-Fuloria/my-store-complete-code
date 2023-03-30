import React, { useEffect, useState } from "react";
import { products } from "../../public/products/Products";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  filterByCompany,
  filterByPrice,
  fetchProduct,
} from "../redux/ProductSlice";
import { ListGroup } from "react-bootstrap";

const FilterBar = () => {
  const [maxprice, setMaxPrice] = useState("");
  const dispatch = useDispatch();
  let products = useSelector((state) => state.products.allProducts);
  const category = ["All"];
  for (let i = 0; i < products.length; i++) {
    const lower = products[i].category.toLowerCase();
    const firstLetter = lower[0].toUpperCase();
    const finalresult = firstLetter + lower.slice(1);
    let response = category.indexOf(finalresult);
    if (response === -1) {
      category.push(finalresult);
    }
  }
  let company = new Set();

  for (let i = 0; i < products.length; i++) {
    company.add(products[i].brand);
  }
  company = [...company];

  const handleCategory = (e) => {
    dispatch(filterByCategory(e.target.dataset.name));
  };

  const handleOption = (e) => {
    dispatch(filterByCompany(e.target.value));
  };

  const handlePriceRange = (e) => {
    setMaxPrice(e.target.value);
    dispatch(filterByPrice(e.target.value));
  };

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  return (
    <>
      <div className="filter-catagory">
        <h4>Category</h4>
        {category && category.length > 0
          ? category.map((element, i) => {
              return (
                <p
                  onClick={(e) => handleCategory(e)}
                  className="my-2"
                  key={i}
                  data-name={element}
                >
                  {element}
                </p>
              );
            })
          : ""}
      </div>
      <div className="filter-company">
        <select
          name=""
          id=""
          className="px-2 py-1"
          onChange={(e) => handleOption(e)}
        >
          <option value="All" defaultValue hidden>
            company
          </option>
          {company.length > 0
            ? company.map((element, i) => {
                return (
                  <option key={i} className="company-options" value={element}>
                    {element}
                  </option>
                );
              })
            : ""}
        </select>
      </div>
      <div>
        <br />
        <label htmlFor="">products price less than {maxprice}</label>
        <input
          type="range"
          min="10"
          max="10000"
          value={maxprice}
          onChange={(e) => handlePriceRange(e)}
        />
      </div>
    </>
  );
};

export default FilterBar;
