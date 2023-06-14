import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { publicRequest } from "../../axiosRequest";

import { BuyCard } from "../../components/Cards/ProductCard/ProductCard";

const BuyCardSkeleton = () => {
  return (
    <div className="col-lg-3 col-md-6 mt-5">
      <Skeleton variant="rectangular" width={320} height={350} />
      <Skeleton className="mt-2" width={220} height={30} />
      <Skeleton width={320} height={25} />
    </div>
  );
};

function HomeFeatured() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const eightProducts = products.slice(0, 8);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await publicRequest.get(`/products?category=Laptops`);
        setProducts(response.data);
        setLoading(true);
      } catch (error) {}
    };
    getProducts();
  }, []);
  return (
    <div className="container pt-3 pb-5">
      <div className="pt-5 pb-2 d-flex justify-content-center">
        <h2 className="main-header">Check out trending items</h2>
      </div>
      <div className="row">
        {loading
          ? eightProducts.map((value, index) => (
              <div className="col-lg-3 col-md-6 mt-5" key={index}>
                <BuyCard
                  image={value?.img[0]?.original}
                  title={value?.title}
                  category={value?.categories[0]}
                  id={value?._id}
                  price={value?.price}
                  product={value}
                  count={value?.count}
                />
              </div>
            ))
          : Array(8)
              .fill()
              .map((_, index) => <BuyCardSkeleton key={index} />)}
      </div>
    </div>
  );
}

export default HomeFeatured;
