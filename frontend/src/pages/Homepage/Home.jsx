import React from "react";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material/";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Footer from "../../components/Footer";
import "./home.css";
import HomeBrand from "./HomeBrand";
import HomeCategory from "./HomeCategory";
import HomeDescription from "./HomeDescription";
import HomeFeatured from "./HomeFeatured";
import HomeSeller from "./HomeSeller";
import MainImage from "./MainImage";
import Navbar from "../../components/Navbar/Navbar";
import Subscribe from "./Subscribe";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function Home() {
  return (
    <>
      <Navbar />
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      <MainImage />
      <HomeBrand />
      <HomeCategory />
      <HomeFeatured />
      <HomeSeller />
      <HomeDescription />
      <Subscribe />
      <Footer />
      <ScrollTop>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default Home;
