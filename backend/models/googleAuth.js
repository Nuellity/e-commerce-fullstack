const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    googleId: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    img: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipcode: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GoogleAuth", userSchema);
