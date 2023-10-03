import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { publicRequest } from "../../utils/axiosRequest";
import { motion } from "framer-motion";
import ProductCard, {
  BigCard,
} from "../../components/Cards/ProductCard/ProductCard";

import { fadeIn, staggerContainer } from "../../utils/motion";
import { TypingText } from "../../components/TypingText";
const ProductSkeleton = () => {
  return (
    <div className="col-md-6">
      <Skeleton variant="rectangular" width={280} height={250} />
    </div>
  );
};

const BigSkeleton = () => {
  return (
    <div className="col-lg-6">
      <Skeleton variant="rectangular" width={550} height={550} />
    </div>
  );
};

function HomeCategory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fiveProducts = products.slice(0, 5);
  const productQuantity = products.length;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await publicRequest.get(
          `/products?category=Gaming Chairs`
        );
        setProducts(response.data);
        setLoading(true);
      } catch (error) {}
    };
    getProducts();
  }, []);
  return (
    <div className="container pb-5">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <TypingText
          title="Explore New And Popular Products"
          textStyles="pb-5"
        />
        <motion.div
          variants={fadeIn("up", "tween", 1.1, 1)}
          className="row g-4"
        >
          {loading ? (
            <BigCard
              image={fiveProducts[0]?.img[0]?.original}
              title={fiveProducts[0]?.title}
              category={fiveProducts[0]?.categories[0]}
              id={fiveProducts[0]?._id}
              productQuantity={productQuantity}
            />
          ) : (
            <BigSkeleton />
          )}

          <div className="col-lg-6">
            <div className="row g-4">
              {loading ? (
                <>
                  <ProductCard
                    image={fiveProducts[1]?.img[0]?.original}
                    title={fiveProducts[1]?.title}
                    category={fiveProducts[1]?.categories[0]}
                    id={fiveProducts[1]?._id}
                    productQuantity={productQuantity}
                    isSale
                  />
                  <ProductCard
                    image={fiveProducts[2]?.img[0]?.original}
                    title={fiveProducts[2]?.title}
                    category={fiveProducts[2]?.categories[0]}
                    id={fiveProducts[2]?._id}
                    productQuantity={productQuantity}
                  />
                  <ProductCard
                    image={fiveProducts[3]?.img[0]?.original}
                    title={fiveProducts[3]?.title}
                    category={fiveProducts[3]?.categories[0]}
                    id={fiveProducts[3]?._id}
                    productQuantity={productQuantity}
                    isHot
                  />
                  <ProductCard
                    image={fiveProducts[4]?.img[0]?.original}
                    title={fiveProducts[4]?.title}
                    category={fiveProducts[4]?.categories[0]}
                    id={fiveProducts[4]?._id}
                    productQuantity={productQuantity}
                  />
                </>
              ) : (
                Array(4)
                  .fill()
                  .map((_, index) => <ProductSkeleton key={index} />)
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HomeCategory;
