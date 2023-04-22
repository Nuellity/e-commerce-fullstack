import React from "react";
import blogData from "../../Data/blogData";
import BlogCard from "../../components/Cards/BlogCard";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";

function Blog() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 style={{ paddingTop: "1.5em", textTransform: "capitalize" }}>
          Check out our blogs
        </h1>
      </div>
      <div className="blog-img-container container">
        <div className="row">
          {blogData.map((value, index) => {
            return (
              <div className="blog-col col-md-6 pb-5" key={index}>
                <BlogCard
                  date={value.date}
                  image={value.image}
                  title={value.title}
                />
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
          <div className="blog-col col-lg-4 col-md-6 pb-5">
            <div className="blog-img ">
              <img
                className="img-fluid  w-100"
                src="images/img/blog/1.webp"
                alt=""
                style={{ borderRadius: "30px" }}
              />
            </div>
            <h4 className="text-center font-weight-normal pt-3">
              Fashion Forward: The Latest Styles and Trends from the Runway
            </h4>
          </div>
          <div className="blog-col col-lg-4 col-md-6 pb-5">
            <div className="blog-img">
              <img
                className="img-fluid  w-100"
                src="images/img/blog/3.webp"
                alt=""
                style={{ borderRadius: "30px" }}
              />
            </div>
            <h4 className="text-center font-weight-normal pt-3">
              Mix and Match: Creative Ways to Wear Your Clothes
            </h4>
          </div>
          <div className="blog-col col-lg-4 col-md-6 pb-5">
            <div className="blog-img">
              <img
                className="img-fluid w-100"
                src="images/img/blog/2.webp"
                alt=""
                style={{ borderRadius: "30px" }}
              />
            </div>
            <h4 className="text-center font-weight-normal pt-3">
              How to Create a Sustainable and Ethical Fashion Collection
            </h4>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Blog;
