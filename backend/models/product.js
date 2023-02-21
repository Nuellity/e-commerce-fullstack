const mongoose = require("mongoose");

 const productSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    img: {type: Array, required: true},
    size: {type: Array},
    categories: {type: Array},
    color: {type: Array},
    price: {type: Number, required: true},
    inStock: {type: Boolean, default: true},
    count: {type: Number, required: true}
 }, {timestamps: true})


 module.exports = mongoose.model("Product", productSchema);