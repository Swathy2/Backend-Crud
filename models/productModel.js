const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please enter a Product"],
    },
    title: {
      type: String,
      required: true,
    },
    releasedate: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    ticketprice: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
