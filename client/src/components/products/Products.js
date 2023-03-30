import React from 'react'

import './products.css'
import FilterBar from '../Fiilter/FilterBar'
import PaginatedItems from '../Pagination/Pagination'


const Products = () => {


  return (
    <>
    <div className="products-container mx-5"> 

    <div className="products-filter">
    <FilterBar/>
   
    </div>

   
    <div className="product-pagination-container">
        <PaginatedItems itemsPerPage={8}/>
    </div>
     
    </div>
     
    </>
  )
}

export default Products

