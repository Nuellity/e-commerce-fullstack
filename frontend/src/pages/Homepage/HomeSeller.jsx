import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { BuyCard } from "../../components/Cards/ProductCard/ProductCard";

function HomeSeller() {
  return (
    <div style={{ paddingBottom: "50px", background: "#FFFFFF" }}>
      <div className="container pt-5">
        <h2 className="main-header">best sellers</h2>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper w-100"
          slidesPerView={2}
          // slidesPerGroup={1}
          // slidesPerColumn={1}
          // breakpoints={{
          //   640: {
          //     slidesPerView: 2,
          //     slidesPerGroup: 2,
          //     slidesPerColumn: 2,
          //     spaceBetween: 5,
          //   },
          //   768: {
          //     slidesPerView: 4,
          //     slidesPerGroup: 4,
          //     slidesPerColumn: 1,
          //     spaceBetween: 7.5,
          //   },
          //   1024: {
          //     slidesPerView: 4,
          //     slidesPerGroup: 4,
          //     slidesPerColumn: 1,
          //     spaceBetween: 10,
          //   },
          // }}
        >
          <SwiperSlide className="my-slide w-100">
            <BuyCard
              title="Geometric Print Scarf"
              price="150.00"
              id="63ed045b7e2b59aabbf0ff5b"
              image={
                "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            />
          </SwiperSlide>
          <SwiperSlide className="my-slide">
            <BuyCard
              title="Geometric Print Scarf"
              price="150.00"
              id="63ed045b7e2b59aabbf0ff5b"
              image={
                "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            />
          </SwiperSlide>
          <SwiperSlide className="my-slide">
            <BuyCard
              title="Geometric Print Scarf"
              price="150.00"
              id="63ed045b7e2b59aabbf0ff5b"
              image={
                "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            />
          </SwiperSlide>
          <SwiperSlide className="my-slide">
            <BuyCard
              title="Geometric Print Scarf"
              price="150.00"
              id="63ed045b7e2b59aabbf0ff5b"
              image={
                "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            />
          </SwiperSlide>
          <SwiperSlide className="my-slide">
            <BuyCard
              title="Geometric Print Scarf"
              price="150.00"
              id="63ed045b7e2b59aabbf0ff5b"
              image={
                "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            />
          </SwiperSlide>
          <SwiperSlide className="my-slide">
            <BuyCard
              title="Geometric Print Scarf"
              price="150.00"
              id="63ed045b7e2b59aabbf0ff5b"
              image={
                "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            />
          </SwiperSlide>
          <SwiperSlide className="my-slide">
            <BuyCard
              title="Geometric Print Scarf"
              price="150.00"
              id="63ed045b7e2b59aabbf0ff5b"
              image={
                "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            />
          </SwiperSlide>
          <SwiperSlide className="my-slide">
            <BuyCard
              title="Geometric Print Scarf"
              price="150.00"
              id="63ed045b7e2b59aabbf0ff5b"
              image={
                "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSeller;
