/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material/";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import ProductDetails from "./ProductDetails";
import { publicRequest } from "../../axiosRequest";

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

  function isEmpty(product) {
    return Object.keys(product).length === 0;
  }

  return (
    <>
      <Navbar />
      <div sx={{ padding: 0, margin: 0 }} id="back-to-top-anchor" />
      {isEmpty(product) ? (
        "loading"
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
