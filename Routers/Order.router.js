const { default: mongoose } = require("mongoose");
const OrderModel = require("../Models/Order.model");

const OrderRouter = require("express").Router();

OrderRouter.post("/create", async (req, res, next) => {
  try {
    const Order = new OrderModel(req.body);
    const response = await Order.save();
    if (response && response._id) {
      return res.status(200).json({
        success: true,
        message: "Orders created successfully",
        data: response,
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
      message: "Internal server error",
    });
  }
});

OrderRouter.get("/:id", async (req, res, next) => {
  try {
    if (!req.params.id) throw new Error("Order Id is not available");
    else {
      const response = await OrderModel.findById(
        new mongoose.Types.ObjectId(req.params.id)
      ).populate("cartId");
      if (response && response._id) {
        return res.status(200).json({
          success: true,
          message: "Order fetched successfully",
          data: response,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
      message: "Internal server error",
    });
  }
});

module.exports = OrderRouter;
