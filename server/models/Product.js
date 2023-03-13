const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ProductSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      current: { type: Number, required: true },
      old: { type: Number },
    },
    img: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String, required: true
    },
    thumbs: {
      type: [],
    },
    review: {
      rating: { type: Number },
      votes: { type: Number },
    },
    productColors: [],
    productSizes: [],
    Availability: {
      type: String,
    },
    gender: {
      type: [],
      required: true,
    },
    productType: { type: String, required: true },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
