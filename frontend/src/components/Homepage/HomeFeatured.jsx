import React from 'react'
import MainProductCard from '../cards/MainProductCard'



function HomeFeatured() {
  return (
   <>
    <div className='container my-5'>
        <div className='mt-5 py-5'>
        <h3>Our Featured</h3>
        </div>
        <div className='row'>
        <MainProductCard/>
        <MainProductCard/>
        <MainProductCard/>
        <MainProductCard/>
        </div>
    </div>
   </>
  )
}

export default HomeFeatured