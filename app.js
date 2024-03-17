const EXPRESS = require("express");

const API_SERVER = EXPRESS();

API_SERVER.use("/products", require("./Routers/Product.router"));

module.exports = API_SERVER;
