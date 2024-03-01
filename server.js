const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
const mongoDBConnectURL = process.env.MONGODB_CONNECT_URL;

mongoose
  .connect(mongoDBConnectURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("node rest api is running");
    });
    console.log("connect to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
app.get("/", (req, res) => {
  res.send("Rest api");
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.send(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/product", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res
        .status(404)
        .json({ message: `cant find the product if ${id}` });
    }

    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cant find the product id ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
