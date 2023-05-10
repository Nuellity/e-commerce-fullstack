const mongoose = require("mongoose");

const savedItemSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedItem", savedItemSchema);
