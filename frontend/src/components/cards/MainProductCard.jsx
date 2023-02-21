import React from 'react'
import { Button } from '@mui/material'


function MainProductCard() {
  return (
    <>
     <div className='card-product text-center col-lg-3 col-md-4  mb-3 '>
        <img className='img-fluid mb-3' src='images/img/featured/3.jpg' alt=''/>
        <div className='card-star'>
        <i className="fa-solid fa-star"/>
        <i className="fa-solid fa-star"/>
        <i className="fa-solid  fa-star"/>
        <i className="fa-solid fa-star"/>
        <i className="fa-solid fa-star"/>
        </div>
        <h5 className='p-name'>Sport Sneakers</h5>
        <h4 className='p-price'>$120.00</h4>
        <Button variant='contained' className='text-uppercase feat-btn' color="success">Buy Now</Button>

        </div>   
    </>
  )
}

export default MainProductCard