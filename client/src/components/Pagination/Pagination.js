import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import HomeCard from "../home/HomeCard";
import { useSelector } from "react-redux";
function PaginatedItems({ itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0);

  const allProducts = useSelector((state) => state.products.filterProducts);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = allProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allProducts.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allProducts.length;
    setItemOffset(newOffset);
  };

  const handleActive = (e) => {
    console.log(e);
  };

  return (
    <>
      <div className="pr-cards">
        {currentItems.length > 0 ? (
          currentItems.map((item) => {
            return <HomeCard products={item} key={item.id} />;
          })
        ) : (
          <h1>Loading</h1>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        activeClassName="active-li"
      />
    </>
  );
}

export default PaginatedItems;
