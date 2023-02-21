/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../Homepage/Footer";
import Navbar from "../../Homepage/Navbar/Navbar";
import ProductDetails from "./ProductDetails";
import axios from "axios";


function ProductInfo() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});




 

  useEffect(() => {
    const getProduct = async () => {
      console.log("enter method")
      try {
        console.log("fetch method")
        const res = await axios.get(
          `http://localhost:4000/api/products/find/${id}`
        );
      const  fetchProduct = res.data
      console.log("try method")
      console.log(fetchProduct)
      setProduct(fetchProduct)
      } catch(error) {
       console.log("catch method")
      }
    };
    getProduct();
    console.log("in action")
   
   
  }, []);

  function isEmpty(product) {
    return Object.keys(product).length === 0;
}
  console.log(isEmpty(product))
  return (
    <>
      <Navbar />

{
  isEmpty(product) ? "loading" : <ProductDetails
        item={product}
        title={product.title}
        image={product.img}
        price={product.price}
        desc={product.description}
        size={product.size}
        count={product.count}
        inStock={product.inStock}
      
      />
}
     

      <Footer />
    </>
  );
}

export default ProductInfo;
