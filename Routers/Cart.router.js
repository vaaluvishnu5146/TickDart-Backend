const {
  createCart,
  getCartById,
  getAllCart,
  updateCart,
  deleteCart,
} = require("../Controllers/Cart.controller");

const CartRouter = require("express").Router();

CartRouter.get("/:id", getCartById);

CartRouter.get("/", getAllCart);

CartRouter.post("/create", createCart);

CartRouter.patch("/update/:id", updateCart);

CartRouter.post("/delete/:id", deleteCart);

module.exports = CartRouter;
