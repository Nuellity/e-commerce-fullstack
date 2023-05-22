/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { BuyCard } from "../../components/Cards/ProductCard/ProductCard";
import { publicRequest } from "../../axiosRequest";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(0.6 * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function HomeSeller() {
  const [products, setProducts] = useState([]);
  const categories = ["Gaming Chairs", "All Flat-Screen TVs"];
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const promises = categories.map((category) =>
          publicRequest.get(
            `http://localhost:4000/api/products?category=${category}`
          )
        );
        const responses = await Promise.all(promises);
        const fetchedProducts = responses.map((response) =>
          response.data.slice(6, 13)
        );
        const flattenedProducts = fetchedProducts.flat();
        const shuffledProducts = shuffleArray(flattenedProducts);
        setProducts(shuffledProducts);
      } catch (error) {
        // Handle error
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
          modules={[Navigation]}
          className="mySwiper "
          slidesPerView={1}
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
            "--swiper-navigation-color": "red", // Change the color of the arrow buttons
          }}
        >
          {products.map((value, index) => (
            <SwiperSlide className="my-slide" key={index}>
              <BuyCard
                image={value?.img[0]?.original}
                title={value?.title}
                category={value?.categories[0]}
                id={value?._id}
                price={value?.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSeller;
