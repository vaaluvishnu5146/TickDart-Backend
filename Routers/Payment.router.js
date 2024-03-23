const { default: mongoose } = require("mongoose");
const PaymentModel = require("../Models/Payments");

const PaymentsRouter = require("express").Router();

PaymentsRouter.post("/create", async (req, res, next) => {
  try {
    const Payment = new PaymentModel(req.body);
    const response = await Payment.save();
    if (response && response._id) {
      return res.status(200).json({
        success: true,
        message: "Payment created successfully",
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

PaymentsRouter.get("/:id", async (req, res, next) => {
  try {
    if (!req.params.id) throw new Error("Payment Id is not available");
    else {
      const response = await PaymentModel.findById(
        new mongoose.Types.ObjectId(req.params.id)
      ).populate("userId orderId");
      if (response && response._id) {
        return res.status(200).json({
          success: true,
          message: "Payment fetched successfully",
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

module.exports = PaymentsRouter;
