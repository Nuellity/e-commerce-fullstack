import React from "react";
import { Button } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import mainImageData from "../../Data/mainImageData";
import {
  zoomIn,
  staggerContainer,
  textVariant,
  fadeIn,
} from "../../utils/motion";

const SlideImage = ({ navigate, heading, description, image }) => {
  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="container-fluid"
      style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}
    >
      <div className="row">
        <div className="col-lg-6">
          <div className="py-5 main-title">
            <motion.h1 variants={textVariant(1.1)}>{heading}</motion.h1>
            <motion.p variants={textVariant(1.2)}>{description}</motion.p>
            <motion.div variants={fadeIn("left", "tween", 1.3, 1)}>
              <Button
                color="primary"
                onClick={() => navigate("/products/")}
                variant="contained"
                style={{
                  width: "9em",
                  height: "2.5em",
                  backgroundColor: "#1E2832",
                  fontSize: "1.2em",
                }}
                startIcon={<ShoppingBagIcon />}
              >
                Shop Now
              </Button>
            </motion.div>
          </div>
        </div>
        <motion.div
          variants={zoomIn(1.2, 1)}
          className="col-lg-6 px-lg-5 img-wrapper"
        >
          <img className="title-img" src={image} alt={heading} />
        </motion.div>
      </div>
    </motion.div>
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
