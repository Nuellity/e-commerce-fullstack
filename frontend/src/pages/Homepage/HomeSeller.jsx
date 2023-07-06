/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { BuyCard } from "../../components/Cards/ProductCard/ProductCard";
import { publicRequest } from "../../axiosRequest";
import { Skeleton } from "@mui/material";

const BuyCardSkeleton = () => {
  return (
    <>
      <Skeleton variant="rectangular" width={320} height={350} />
      <Skeleton className="mt-2" width={220} height={30} />
      <Skeleton width={320} height={25} />
    </>
  );
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(0.6 * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function HomeSeller() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const categories = ["Gaming Chairs", "All Flat-Screen TVs"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const promises = categories.map((category) =>
          publicRequest.get(`/products?category=${category}`)
        );
        const responses = await Promise.all(promises);
        const fetchedProducts = responses.map((response) =>
          response.data.slice(6, 13)
        );
        const flattenedProducts = fetchedProducts.flat();
        const shuffledProducts = shuffleArray(flattenedProducts);
        setProducts(shuffledProducts);
        setLoading(true);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ paddingBottom: "50px", background: "#FFFFFF" }}>
      <div className="container pt-5">
        <h2 className="main-header pb-5">best sellers</h2>
        <Swiper
          navigation
          modules={[Navigation, Autoplay]}
          className="mySwiper "
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          style={{
            "--swiper-navigation-color": "red",
          }}
        >
          {loading
            ? products.map((value, index) => (
                <SwiperSlide className="my-slide" key={index}>
                  <BuyCard
                    image={value?.img[0]?.original}
                    title={value?.title}
                    category={value?.categories[0]}
                    id={value?._id}
                    price={value?.price}
                    product={value}
                    count={value?.count}
                  />
                </SwiperSlide>
              ))
            : Array(4)
                .fill()
                .map((_, index) => (
                  <SwiperSlide className="my-slide" key={index}>
                    <BuyCardSkeleton />
                  </SwiperSlide>
                ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSeller;
