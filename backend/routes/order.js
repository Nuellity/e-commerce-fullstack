const router = require("express").Router();
const Order = require("../models/order");
const Product = require("../models/product");
const sendEmail = require("../sendEmail");
const myModule = require("../template");
const { verifyTokenAdmin, verifyToken } = require("./verify");

const orderEmail = myModule.createOrderEmail;
const stockEmail = myModule.outOfStock;
const reStockEmail = myModule.reStock;
const processEmail = myModule.processOrderEmail;
const deliveryEmail = myModule.packageDeliveredEmail;

// CREATE ORDER

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    for (const product of savedOrder.products) {
      const productId = product.productId;
      const quantity = product.quantity;

      await Product.updateOne(
        { _id: productId },
        { $inc: { count: -quantity } }
      );

      const updatedProduct = await Product.findOne({ _id: productId });
      if (updatedProduct.count === 0) {
        updatedProduct.inStock = false;
        await updatedProduct.save();
        const id = updatedProduct._id;
        const subject = "You are out of stock";
        const sent_from = process.env.EMAIL_USER;
        const send_to = process.env.ADMIN_EMAIL;
        const message = reStockEmail(id);
        await sendEmail(subject, message, send_to, sent_from);
      } else if (updatedProduct.count <= 5) {
        const number = updatedProduct.count;
        const id = updatedProduct._id;
        const send_to = process.env.ADMIN_EMAIL;
        const subject = "Few Items Left";
        const sent_from = process.env.EMAIL_USER;
        const message = stockEmail(number, id);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await sendEmail(subject, message, send_to, sent_from);
      }
    }

    const date = savedOrder.createdAt;
    const orderId = savedOrder._id;
    const orderItems = savedOrder.products;
    const amount = savedOrder.amount;
    const subject = "Order successfully placed on Ayaba";
    const adminSubject = "You have a new order";
    const send_to_admin = process.env.ADMIN_EMAIL;
    const send_to = savedOrder.email;
    const sent_from = process.env.EMAIL_USER;
    const message = orderEmail(date, orderId, orderItems, amount);
    const adminMessage = processEmail(date, orderId, orderItems, amount);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await sendEmail(adminSubject, adminMessage, send_to_admin, sent_from);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await sendEmail(subject, message, send_to, sent_from);
    res
      .status(200)
      .send({ success: true, message: "Order placed and Email sent" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE ORDER BY ID

router.patch("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const date = updatedOrder.updatedAt;
    const orderId = updatedOrder._id;
    const name = updatedOrder.deliveryName;
    const address = updatedOrder.address;
    const orderItems = updatedOrder.products;
    const amount = updatedOrder.amount;
    const subject = "Your package has been delivered";
    const send_to = updatedOrder.email;
    const sent_from = process.env.EMAIL_USER;
    const message = deliveryEmail(
      date,
      orderId,
      orderItems,
      amount,
      name,
      address
    );
    await sendEmail(subject, message, send_to, sent_from);
    res
      .status(200)
      .send({ success: true, message: "Order placed and Email sent" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ORDER BY ID

router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND ORDER BY USER ID

router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND ORDER BY ID

router.get("/findbyid/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND ALL ORDERS

router.get("/", verifyTokenAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET MONTHLY INCOME

router.get("/income", verifyTokenAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && { products: { $elemMatch: { productId } } }),
        },
      },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", totalOrders: { $sum: "$sales" } } },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET DAILY INCOME

router.get("/incomeperday", verifyTokenAdmin, async (req, res) => {
  const productId = req.query.pid;
  const currentDate = new Date();
  const last24Hours = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
  try {
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: last24Hours },
          ...(productId && { products: { $elemMatch: { productId } } }),
        },
      },
      { $project: { day: { $dayOfYear: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$day", totalOrders: { $sum: "$sales" } } },
      { $sort: { _id: 1 } },
    ];
    const income = await Order.aggregate(pipeline);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DAILY ORDERS

router.get("/ordersperday", verifyTokenAdmin, async (req, res) => {
  const productId = req.query.pid;
  const currentDate = new Date();
  const last24Hours = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

  try {
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: last24Hours },
          ...(productId && { products: { $elemMatch: { productId } } }),
        },
      },
      { $group: { _id: null, totalOrders: { $sum: 1 } } },
    ];
    const orders = await Order.aggregate(pipeline);
    res.status(200).json(orders[0].totalOrders);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
