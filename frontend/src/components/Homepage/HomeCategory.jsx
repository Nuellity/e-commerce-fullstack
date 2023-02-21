import React from 'react'
import categoryData from '../../Data/categoryData'
import CategoryCard from '../cards/CategoryCard'

function HomeCategory() {
  return (
    <>
        <div className='container'>
            <div className='row g-2'>
            {
                categoryData.map((value, index)=>{
                    return(
                        <CategoryCard image={value.imgURL} title={value.title} action={value.action} key={index} />
                    )
                    
                })
            }
            
            

            </div>
        </div>
    </>
  )
}

export default HomeCategory