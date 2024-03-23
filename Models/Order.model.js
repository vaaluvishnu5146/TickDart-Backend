const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    cartId: {
      type: String,
      ref: "cart",
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: [{ status: String, date: String }],
      default: [],
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", OrderSchema);
module.exports = OrderModel;
