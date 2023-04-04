import React from "react";
import Footer from "./Footer";
import "./home.css";
import HomeBanner from "./HomeBanner";
import HomeBestDeals from "./HomeBestDeals";
import HomeBestSellers from "./HomeBestSellers";
import HomeBrand from "./HomeBrand";
import HomeCategory from "./HomeCategory";
import HomeCollections from "./HomeCollections";
import HomeDescription from "./HomeDescription";
import HomeDiscount from "./HomeDiscount";
import HomeFeatured from "./HomeFeatured";
import HomeItemList from "./HomeItemList";
import HomeNewArrival from "./HomeNewArrival";
import HomeNewSection from "./HomeNewSection";
import HomeShopCategory from "./HomeShopCategory";
import HomeTrending from "./HomeTrending";
import Navbar from "./Navbar/Navbar";

import Subscribe from "./Subscribe";
import TopCarousel from "./TopCarousel";

function Home() {
  return (
    <>
      <Navbar />

      <TopCarousel />
      <div className="container">
        <HomeBrand />
        <HomeShopCategory />
      </div>
      <HomeNewSection />
      <div className="container">
        <HomeFeatured />
        <HomeCategory />
        <HomeNewArrival />
        <HomeBestDeals />
      </div>
      <HomeBanner />
      <div className="container">
        <HomeCollections />
        <HomeItemList />
        <HomeTrending />
      </div>
      <HomeDescription />
      <div className="container">
        <HomeDiscount />
        <HomeBestSellers />
      </div>
      <Subscribe />

      <Footer />
    </>
  );
}

export default Home;
