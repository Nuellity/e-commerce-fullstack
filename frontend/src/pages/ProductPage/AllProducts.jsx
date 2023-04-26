import React, { useEffect, useState } from "react";
import axios from "axios";
import { BuyCard } from "../../components/Cards/ProductCard/ProductCard";
import { Skeleton } from "@mui/material";

const BuyCardSkeleton = () => {
  return (
    <div className="col-lg-3 col-md-6 mt-5">
      <Skeleton variant="rectangular" width={320} height={350} />
      <Skeleton className="mt-2" width={220} height={30} />
      <Skeleton width={320} height={25} />
    </div>
  );
};

function AllProducts({ category, filter }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          category
            ? `http://localhost:4000/api/products?category=${category}`
            : "http://localhost:4000/api/products"
        );
        setProducts(response.data);
        setLoading(true);
      } catch (error) {}
    };
    getProducts();
  }, [category]);

  return (
    <div className="row">
      {loading
        ? products.map((value, index) => {
            return (
              <BuyCard
                key={value._id}
                category={category}
                filter={filter}
                image={value.img[0].original}
                price={value.price}
                title={value.title}
                id={value._id}
              />
            );
          })
        : Array(8)
            .fill()
            .map((_, index) => <BuyCardSkeleton key={index} />)}
    </div>
  );
}

export default AllProducts;

// useEffect(() => {
// if((filter === "new")){
//   setProducts((prev) => {
//     [...prev].sort((a,b) => a.createdAt - b.createdAt)
//   })
// }else if((filter === "highPrice")){
//   setProducts((prev) => {
//     [...prev].sort((a,b) => a.price - b.price)
//   })
// }else if((filter === "lowPrice ")){
//   setProducts((prev) => {
//     [...prev].sort((a,b) => b.price - a.price)
//   })
// }
// }, [filter])
