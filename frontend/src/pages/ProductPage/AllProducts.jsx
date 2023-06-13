import React, { useEffect, useState } from "react";
import { BuyCard } from "../../components/Cards/ProductCard/ProductCard";
import { Skeleton } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { publicRequest } from "../../axiosRequest";

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
  const [page, setPage] = useState(1);
  const perPage = 12;

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const pageCount = Math.ceil(products.length / perPage);

  const productsToShow = loading ? products.slice(startIndex, endIndex) : [];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await publicRequest.get(
          category ? `/products?category=${category}` : "/products"
        );
        let filteredProducts = response.data;
        if (filter === "new") {
          // Filter by createdAt (newest first)
          filteredProducts.sort((a, b) => b.createdAt - a.createdAt);
        } else if (filter === "highPrice") {
          // Filter by highest price
          filteredProducts.sort((a, b) => b.price - a.price);
        } else if (filter === "lowPrice") {
          // Filter by lowest price
          filteredProducts.sort((a, b) => a.price - b.price);
        }
        setProducts(filteredProducts);
        setLoading(true);
      } catch (error) {}
    };
    getProducts();
  }, [category, filter]);

  return (
    <div className="row">
      {loading
        ? productsToShow.map((value) => {
            return (
              <div className="col-lg-3 col-md-6 mt-5" key={value._id}>
                <BuyCard
                  image={value.img[0].original}
                  price={value.price}
                  title={value.title}
                  id={value._id}
                  category={value.categories[0]}
                  product={value}
                  count={value?.count}
                />
              </div>
            );
          })
        : Array(8)
            .fill()
            .map((_, index) => <BuyCardSkeleton key={index} />)}
      <Stack mt={4} spacing={2} sx={{ padding: "1.5em 0" }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(event, value) => setPage(value)}
          renderItem={(item) => (
            <PaginationItem
              components={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
}

export default AllProducts;
