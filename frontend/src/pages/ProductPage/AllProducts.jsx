import React, { useEffect, useState } from "react";
import axios from "axios";
import { BuyCard } from "../../components/Cards/ProductCard/ProductCard";

function AllProducts({ category, filter }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          category
            ? `http://localhost:4000/api/products?category=${category}`
            : "http://localhost:4000/api/products"
        );
        setProducts(response.data);
      } catch (error) {}
    };
    getProducts();
  }, [category]);

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

  return (
    <div className="row">
      {products.map((value, index) => {
        return (
          <>
            {/* <ListCard item={value} category={category} filter={filter} image={value.img[0].original} price={value.price} title={value.title} id={value._id} /> */}
            <BuyCard
              key={index}
              category={category}
              filter={filter}
              image={value.img[0].original}
              price={value.price}
              title={value.title}
              id={value._id}
            />
          </>
        );
      })}
      <BuyCard
        title="Geometric Print Scarf"
        price="150.00"
        id="63ed045b7e2b59aabbf0ff5b"
        image={
          "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
      />
    </div>
  );
}

export default AllProducts;
