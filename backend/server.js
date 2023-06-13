require("dotenv").config();
const express = require("express");
const connectDatabase = require("./config/mongoDb");
const saveProductsToDatabase = require("./fetch");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const reviewRoutes = require("./routes/review");
const savedItemRoutes = require("./routes/savedItem");
const stripeRoutes = require("./routes/stripe");
const webPushRoutes = require("./routes/webPush");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const startServer = async () => {
  await connectDatabase();

  const app = express();

  app.use(
    express.static(path.join(__dirname, "frontend"), {
      setHeaders: (res, path, stat) => {
        if (path === "/service-worker.js") {
          res.set("Content-Type", "application/javascript");
        }
      },
    })
  );

  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());

  await saveProductsToDatabase();

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/wishlists", savedItemRoutes);
  app.use("/api/checkout", stripeRoutes);
  app.use("/api/subscribe", webPushRoutes);

  const port = process.env.PORT || 5000;

  app.listen(port, () =>
    console.log(`Backend Server is running on port ${port}`)
  );
};

startServer();
