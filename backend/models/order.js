const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    deliveryName: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        name: { type: String },
        img: { type: String },
        size: { type: String },
        price: { type: Number },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
    paymentIntent: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
