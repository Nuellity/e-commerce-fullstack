/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../Homepage/Footer";
import Navbar from "../../Homepage/Navbar/Navbar";
import ProductDetails from "./ProductDetails";
import { publicRequest } from "../../../axiosRequest";

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
    </>
  );
}

export default ProductInfo;
