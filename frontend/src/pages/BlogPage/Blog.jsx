import React from "react";
import blogData from "../../Data/blogData";
import BlogCard, { SmallBlogCard } from "../../components/Cards/BlogCard";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material/";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

function Blog() {
  return (
    <>
      <Navbar />
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
        <div className="container">
          <h1
            style={{
              paddingTop: "1.5em",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            Check out our blogs
          </h1>
        </div>
        <div className="blog-img-container container">
          <div className="row">
            {blogData.map((value, index) => {
              return (
                <div className="blog-col col-md-6 pb-5" key={index}>
                  <Link
                    to="/blog-details"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <BlogCard
                      date={value.date}
                      image={value.image}
                      title={value.title}
                    />
                  </Link>
                </div>
              );
            })}

            <div className="col-lg-12 pb-5">
              <div className="blog-img">
                <img
                  className="img-fluid w-100"
                  src="images/img/blog/banner.webp"
                  alt=""
                  style={{ borderRadius: "45px" }}
                />
              </div>
            </div>
            <SmallBlogCard
              title="Fashion Forward: The Latest Styles and Trends from the Runway"
              image="images/img/blog/1.webp"
            />
            <SmallBlogCard
              title=" Mix and Match: Creative Ways to Wear Your Clothes"
              image="images/img/blog/3.webp"
            />
            <SmallBlogCard
              title="How to Create a Sustainable and Ethical Fashion Collection"
              image="images/img/blog/2.webp"
            />
          </div>
        </div>
      </div>
      <Footer />
      <ScrollTop>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default Blog;
