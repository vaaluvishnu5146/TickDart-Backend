const ProductsModel = require("../Models/Product.model");

function getAllProducts(req, res, next) {
  const page = req.query.page || 1;
  const limit = 5;
  const skip = page === 1 ? 0 : (page - 1) * limit;

  ProductsModel.find()
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

function saveProduct(req, res, next) {
  const Product = new ProductsModel(req.body);
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
  getAllProducts,
  saveProduct,
};
