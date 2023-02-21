require("dotenv").config();
const express = require("express");
const connectDatabase = require("./config/mongoDb");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const stripeRoutes = require("./routes/stripe");
const cors = require("cors");
const bodyParser = require("body-parser");

connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/checkout", stripeRoutes);

const port = process.env.port || 4000;

app.listen(port, () =>
  console.log(`Backend Server is running on port ${port}`)
);
