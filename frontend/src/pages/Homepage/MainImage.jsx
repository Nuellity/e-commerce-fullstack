import React from "react";
import { Button } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import mainImageData from "../../Data/mainImageData";

const SlideImage = ({ navigate, heading, description, image }) => {
  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}
    >
      <div className="row">
        <div className="col-lg-6">
          <div className="py-5 main-title">
            <h1
              className="animate__animated animate__lightSpeedInLeft"
              style={{ animationDelay: "1s" }}
            >
              {heading}
            </h1>
            <p
              className="animate__animated animate__lightSpeedInRight"
              style={{ animationDelay: "2s" }}
            >
              {description}
            </p>
            <Button
              color="primary"
              onClick={() => navigate("/products/")}
              variant="contained"
              className="animate__animated animate__fadeInUp"
              style={{
                animationDelay: "3s",
                width: "9em",
                height: "2.5em",
                backgroundColor: "#1E2832",
                fontSize: "1.2em",
              }}
              startIcon={<ShoppingBagIcon />}
            >
              Shop Now
            </Button>
          </div>
        </div>
        <div className="col-lg-6 px-lg-5 img-wrapper">
          <img className="title-img" src={image} alt={heading} />
        </div>
      </div>
    </div>
  );
};

function MainImage() {
  const navigate = useNavigate();

  return (
    <Swiper
      modules={[Autoplay]}
      className="mySwiper"
      slidesPerView={1}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
    >
      {mainImageData.map((value) => (
        <SwiperSlide key={value.heading}>
          <SlideImage
            key={value.heading}
            navigate={navigate}
            heading={value.heading}
            description={value.description}
            image={value.image}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MainImage;
