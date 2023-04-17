import React from "react";
import Footer from "../../components/Footer";
import "./home.css";
import HomeAdvert from "./HomeAdvert";
import HomeBanner from "./HomeBanner";
import HomeBrand from "./HomeBrand";
import HomeCategory from "./HomeCategory";
import HomeDescription from "./HomeDescription";
import HomeFeatured from "./HomeFeatured";
import HomeSeller from "./HomeSeller";
import MainImage from "./MainImage";
import Navbar from "../../components/Navbar/Navbar";
import Subscribe from "./Subscribe";

function Home() {
  return (
    <>
      <Navbar />
      <MainImage />
      <HomeBrand />
      <HomeCategory />
      <HomeAdvert />
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
