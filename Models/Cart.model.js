const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "user",
      required: true,
    },
    products: {
      type: Array,
      required: true,
      validate: [(val) => val.length <= 0, "Must have minimum one product"],
    },
    products: {
      type: [
        {
          productId: { type: String, ref: "product" },
          quantity: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} should have atleast one item"],
    },
    couponCode: {
      type: String,
      required: false,
    },
    cartValue: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length != 0;
}

const CartModel = mongoose.model("cart", CartSchema);
module.exports = CartModel;
