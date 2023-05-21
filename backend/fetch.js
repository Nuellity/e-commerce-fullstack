require("dotenv").config();
const axios = require("axios");
const Product = require("./models/product");

const categories = ["Gaming Chairs", "Audio", "All Flat-Screen TVs", "Laptops"];

const apiKey = process.env.BEST_BUY_API_KEY;

const saveProductsToDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log("Product collection is not empty. Skipping product save.");
      return;
    }

    for (const category of categories) {
      const response = await axios.get(
        `https://api.bestbuy.com/v1/products(categoryPath.name=${encodeURIComponent(
          category
        )})?apiKey=${apiKey}&format=json&pageSize=20`
      );
      const productsData = response.data.products;

      for (const productData of productsData) {
        if (productData.quantityLimit === null) {
          console.log(
            "Skipping product with null quantity limit:",
            productData.name
          );
          continue;
        }

        const filteredImages = productData.images.filter((image) => {
          const height = Number(image.height);
          return height >= 500 && height <= 1000;
        });
        const firstFiveImages = filteredImages.slice(0, 5);
        const newProduct = new Product({
          title: productData.name,
          description: productData.longDescription,
          img: firstFiveImages.map((image) => ({
            original: image.href,
            thumbnail: image.href,
          })),
          size: productData.size,
          categories: category,
          price: productData.salePrice,
          inStock: productData.inStoreAvailability,
          count: productData.quantityLimit,
        });

        await newProduct.save();
      }
      console.log(
        `Saved ${productsData.length} products for category: ${category}`
      );
    }
  } catch (error) {
    console.error("Error while saving products:", error.message);
  }
};

module.exports = saveProductsToDatabase;
