const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "user",
      required: true,
    },
    orderId: {
      type: String,
      ref: "order",
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    transactionMode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PaymentModel = mongoose.model("payment", PaymentSchema);
module.exports = PaymentModel;
