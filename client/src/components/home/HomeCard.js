import React, { useEffect, useState } from 'react'
import './HomeCard.css'
import {BsCheckLg, BsFillStarFill,BsStarHalf} from 'react-icons/bs'
import {NavLink} from 'react-router-dom'

const HomeCard = ({products}) => {
  const{title,price,rating,thumbnail}=products;
  const[stars,setStars]=useState([])
  var noOfFullStars=0
  var noOfHalfStars=0
 const startnum=()=>{
  if(rating>0)
  {
    noOfFullStars=Math.floor(rating)
    noOfHalfStars=Math.ceil(rating)
    const num=[]
    for(let i=0;i<noOfFullStars;i++)
    {
      num.push(i)
    }
    setStars(num)
  }
 }

  useEffect(()=>{
    startnum()
  },[products])
  return (
    <>
    <NavLink to={`/details/${products._id}`} className="card-a-tag">
    <div className="card-container border-product">
      
  <img src={thumbnail} className="" alt="p2"/>
  <div className="">
    {
      title.length<14?<h1 className="text-small mt-2 title-text margin-zero">{title}</h1>:<h1 className="text-small mt-2 title-text margin-zero">{title.slice(0,15)}...</h1>
    }
    
    <div className="reviews d-flex justify-content-between">
      <div>
        {
          stars && stars.length>0?stars.map((element)=>{
           return <BsFillStarFill className='stars margin-zero'/>
          }):''
        }
         {
           noOfHalfStars !=0?
           <BsFillStarFill className='stars margin-zero'/>
         :''
         }
         
        
       <BsStarHalf className='stars'/>
      </div>
      <div>
      <p className='text-small margin-zero'>21 reviews</p>
      </div>
     
    </div>
    <p className="text-medium margin-zero" >${price}</p>
   
  </div>
</div>
</NavLink>  
    </>
  )
}

export default HomeCard
