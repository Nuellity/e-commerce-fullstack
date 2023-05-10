const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    review: [
      {
        title: { type: String, required: true },
        userName: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, default: "pending" },
        rating: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
