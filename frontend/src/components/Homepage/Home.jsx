import React from "react";
import Footer from "./Footer";
import "./home.css";
import HomeBanner from "./HomeBanner";
import HomeBestSellers from "./HomeBestSellers";
import HomeBrand from "./HomeBrand";
import HomeCategory from "./HomeCategory";
import HomeDescription from "./HomeDescription";
import HomeFeatured from "./HomeFeatured";
import HomeSeller from "./HomeSeller";
import Navbar from "./Navbar/Navbar";
import Subscribe from "./Subscribe";
// import TopCarousel from "./TopCarousel";

function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <HomeBestSellers />

        {/* <TopCarousel /> */}
        <HomeCategory />
      </div>
      <HomeBrand />
      <HomeFeatured />
      <HomeBanner />
      <HomeDescription />
      <HomeSeller />
      <Subscribe />

      <Footer />
    </>
  );
}

export default Home;
