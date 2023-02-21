import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import BuyProductCard from "../cards/BuyProductCard";
import newArrivalData from "../../Data/newArrivalData";




function HomeBestDeals() {
  return (
    <div className="container justify-content-center">
    <h4>BEST DEALS</h4>
      <Swiper
        grabCursor={true}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper"
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
      { newArrivalData.map((value, index)=>{
        return(
            <SwiperSlide key={index}>
        <BuyProductCard title={value.title} image={value.imgURL} price={value.price} />
      </SwiperSlide>
        )
        

      })}
     

      </Swiper>
    </div>
  );
}

export default HomeBestDeals;
