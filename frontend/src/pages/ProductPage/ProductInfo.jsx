/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Fab,
  Fade,
  Skeleton,
  useScrollTrigger,
  useMediaQuery,
  useTheme,
} from "@mui/material/";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import ProductDetails from "./ProductDetails";
import { publicRequest } from "../../axiosRequest";

const ProductDetailsSkeleton = () => {
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.up("sm"));
  const isIpad = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");

  return (
    <div style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6">
            <Skeleton
              variant="rectangular"
              width={isIpad ? 700 : isMatch ? 600 : 350}
              height={isMatch ? 400 : 250}
            />
            <div className="row mt-2">
              <div className="col-3">
                <Skeleton
                  variant="rectangular"
                  width={isIpad ? 160 : isMatch ? 106 : 70}
                  height={isIpad ? 160 : isMatch ? 106 : 70}
                />
              </div>
              <div className="col-3">
                <Skeleton
                  variant="rectangular"
                  width={isIpad ? 160 : isMatch ? 106 : 70}
                  height={isIpad ? 160 : isMatch ? 106 : 70}
                />
              </div>
              <div className="col-3">
                <Skeleton
                  variant="rectangular"
                  width={isIpad ? 160 : isMatch ? 106 : 70}
                  height={isIpad ? 160 : isMatch ? 106 : 70}
                />
              </div>
              <div className="col-3 ">
                <Skeleton
                  variant="rectangular"
                  width={isIpad ? 160 : isMatch ? 106 : 70}
                  height={isIpad ? 160 : isMatch ? 106 : 70}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-2">
            <Skeleton width={140} height={100} />
            <Skeleton width={200} height={80} />
            <Skeleton width={140} height={80} />
            <div style={{ marginTop: "0.5rem" }}>
              <Skeleton
                width={isIpad ? 700 : isMatch ? 500 : 350}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

function ProductInfo() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(
          `http://localhost:4000/api/products/find/${id}`
        );
        const fetchProduct = res.data;

        setProduct(fetchProduct);
      } catch (error) {}
    };
    getProduct();
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await publicRequest.get(
          `http://localhost:4000/api/reviews/find/${id}`
        );
        const fetchReviews = res.data;

        setReviews(fetchReviews);
      } catch (error) {}
    };
    getReviews();
  }, []);

  function isEmpty(product) {
    return Object.keys(product).length === 0;
  }

  return (
    <>
      <Navbar />
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      {isEmpty(product) ? (
        <ProductDetailsSkeleton />
      ) : (
        <ProductDetails
          product={product}
          title={product.title}
          image={product.img}
          itemPrice={product.price}
          desc={product.description}
          sizes={product.size}
          count={product.count}
          inStock={product.inStock}
          reviews={reviews}
        />
      )}
      <Footer />
      <ScrollTop>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default ProductInfo;
