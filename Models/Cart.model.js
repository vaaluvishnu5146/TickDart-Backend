const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "user",
      required: true,
    },
    // products: {
    //   type: Array,
    //   required: true,
    //   validate: [(val) => val.length <= 0, "Must have minimum one product"],
    // },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: Number,
      },
    ],
    couponCode: {
      type: String,
      required: false,
      validate: [couponValidator, "Error coupon"],
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

function couponValidator() {
  return true;
}

const CartModel = mongoose.model("cart", CartSchema);
module.exports = CartModel;
