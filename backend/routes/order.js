const router = require("express").Router();
const Order = require("../models/order");
const {
  verifyTokenAuthorization,
  verifyTokenAdmin,
  verifyToken,
} = require("./verify");

// CREATE ORDER

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
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
    res.status(200).json(updatedOrder);
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

//FIND USER ORDER

router.get("/find/:userId", verifyTokenAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });

    res.status(200).json(orders);
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
