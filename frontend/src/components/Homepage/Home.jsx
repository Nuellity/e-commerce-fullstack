import React from "react";
import Footer from "./Footer";
import "./home.css";
import HomeBanner from "./HomeBanner";
import HomeBrand from "./HomeBrand";
import HomeCategory from "./HomeCategory";
import HomeDescription from "./HomeDescription";
import HomeFeatured from "./HomeFeatured";
import HomeSeller from "./HomeSeller";
import MainImage from "./MainImage";
import Navbar from "./Navbar/Navbar";
import Subscribe from "./Subscribe";

function Home() {
  return (
    <>
      <Navbar />
      <MainImage />
      <HomeCategory />
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
