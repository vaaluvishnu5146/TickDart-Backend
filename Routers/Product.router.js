const {
  saveProduct,
  getAllProducts,
} = require("../Controllers/Product.controller");

const ProductRouter = require("express").Router();

ProductRouter.get("/", getAllProducts);

ProductRouter.post("/create", saveProduct);

module.exports = ProductRouter;
