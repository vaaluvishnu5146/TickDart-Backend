const { default: mongoose } = require("mongoose");
const CartModel = require("../Models/Cart.model");

function computeCartPrice(data = {}) {
  let value = 0;
  for (let i = 0; i < data.products.length; i++) {
    value += data.products[i].quantity * data.products[i].product.actualCost;
  }
  return value;
}

function getAllCart(req, res, next) {
  const page = req.query.page || 1;
  const limit = 5;
  const skip = page === 1 ? 0 : (page - 1) * limit;

  CartModel.find()
    .limit(limit)
    .skip(skip)
    .then((response) => {
      if (response.length > 0) {
        res.status(200).json({
          message: "Products fetched successfully",
          success: true,
          data: response,
          page: Number(page),
          length: response.length,
        });
      } else {
        res.status(200).json({
          message: "No Products",
          data: [],
          success: true,
          page: Number(page),
          length: response.length,
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Bad Request",
        error: error,
      });
    });
}

async function getCartById(req, res, next) {
  try {
    if (!req.params.id) throw new Error("User Id is missing");
    const response = await CartModel.findById({ _id: req.params.id })
      // .populate({
      //   path: "userId",
      //   model: "user",
      //   select: ["name", "email"],
      // })
      .populate({
        path: "products.product",
        model: "products",
        select: {
          _id: 0,
          actualCost: 1,
          image: 1,
          name: 1,
        },
      });
    response["cartValue"] = computeCartPrice(response);
    if (response && response._id) {
      res.status(200).json({
        message: "Cart fetched successfully",
        success: true,
        data: response,
      });
    } else {
      res.status(200).json({
        message: "No Cart item found",
        data: {},
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error,
    });
  }
}

async function createCart(req, res, next) {
  try {
    const Cart = new CartModel(req.body);
    const response = await Cart.save();
    if (response && response._id) {
      res.status(200).json({
        success: true,
        message: "Cart created successfully",
        cart: response,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
}

async function updateCart(req, res, next) {
  try {
    const response = await CartModel.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      req.body,
      { new: true }
    );
    if (response && response._id) {
      res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: response,
      });
    } else {
      return res.status(500).json({
        message: "Something went wrong",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error,
    });
  }
}

function deleteCart(req, res, next) {
  const Product = new CartModel(req.body);
  Product.save()
    .then((response) => {
      if (response._id) {
        return res.status(200).json({
          message: "Products created successfully",
        });
      } else {
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Bad request",
        error: err,
      });
    });
}

module.exports = {
  getAllCart,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
};
