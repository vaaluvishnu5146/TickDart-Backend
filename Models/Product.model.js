const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  normalCost: {
    type: Number,
    required: true,
  },
  actualCost: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const ProductsModel = mongoose.model("products", ProductSchema);
module.exports = ProductsModel;
