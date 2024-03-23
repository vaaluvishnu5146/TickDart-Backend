const EXPRESS = require("express");

const API_SERVER = EXPRESS();

API_SERVER.use("/products", require("./Routers/Product.router"));
API_SERVER.use("/user", require("./Routers/User.router"));
API_SERVER.use("/cart", require("./Routers/Cart.router"));
API_SERVER.use("/order", require("./Routers/Order.router"));
API_SERVER.use("/payment", require("./Routers/Payment.router"));

module.exports = API_SERVER;
