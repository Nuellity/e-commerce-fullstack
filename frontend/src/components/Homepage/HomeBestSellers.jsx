import React from 'react'
import BuyProductCard from "../cards/BuyProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import newArrivalData from '../../Data/newArrivalData';



export default function HomeBestSellers() {
  return (
    <>
        <div className="container">
        <h4>CHECK OUT THE BEST SELLERS</h4>
        <Swiper
        navigation
        grabCursor={true}
        freeMode={true}
        speed={800}
        modules={[FreeMode, Pagination, Navigation, Autoplay]}
        className="mySwiper"
        style={{
                      "--swiper-navigation-color": "#000",
                      "--swiper-navigation-size": "25px",
                      
                    }}

        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
            0: {
                slidesPerView: 1,
            spaceBetween: 5, 
            },
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 7.5,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 7.5,
          },
        }}
      >
        { newArrivalData.map((value, index) => {
            return (
             
              <SwiperSlide className='swiper-slide' key={index}>
        <BuyProductCard title={value.title} image={value.imgURL} price={value.price} />
      </SwiperSlide>
              
            );
          })}
          </Swiper>
      </div> 
    </>
  )
}
