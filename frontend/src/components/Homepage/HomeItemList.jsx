import React from 'react'
import HomeItem from './HomeItem'
import itemData from "../../Data/itemData";

function HomeItemList() {

    const data = itemData;

  return (
    <>
    <div className='container'>
    <div className='row g-2'>
    <HomeItem info={data} name={"All Halloween"}/>
    <HomeItem info={data} name={"Fashion Favorite for Fall"}/>
    <HomeItem info={data} name={"Gaming Accessories"}/>
    <HomeItem info={data} name={"Shop by Category"}/>
    </div>
    </div>


    </>
  )
}

export default HomeItemList