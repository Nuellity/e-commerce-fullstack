import React from 'react'
import shopCategoryData from '../../Data/shopCategoryData'
import ImageOverlayCard from '../cards/ImageOverlayCard'

function HomeShopCategory() {
  return (
  <>
  <div className='container'>
            <div className='row g-2'>
            {shopCategoryData.map((value, index)=>{
                return(
                    <ImageOverlayCard image={value.imgURL} title={value.title} key={index}/>

                )

            })}
                
            </div>

            </div>
 
  </>
   
  )
}

export default HomeShopCategory