const UserModel = require("../Models/User.model");
const bcrypt = require("bcrypt");

const saltRounds = 10;

function getAllUsers(req, res, next) {
  const page = req.query.page || 1;
  const limit = 5;
  const skip = page === 1 ? 0 : (page - 1) * limit;

  UserModel.find()
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

/**
 * For creating user account, call this function
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function createUser(req, res, next) {
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const User = new UserModel({ ...req.body, password: hash });
    User.save()
      .then((response) => {
        if (response._id) {
          return res.status(200).json({
            message: "User created successfully",
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
  } else {
    return res.status(400).json({
      success: false,
      message: "Password is missing",
    });
  }
}

/**
 * For creating session for user, call this function
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function signinUser(req, res, next) {
  try {
    if (req.body.email && req.body.password) {
      const response = await UserModel.findOne({ email: req.body.email });
      if (
        response &&
        response._id &&
        bcrypt.compareSync(req.body.password, response.password)
      ) {
        return res.status(200).json({
          success: true,
          message: "Sign in successful",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Email or password is in-correct",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Email or password is missing",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
}

async function updateUserById(req, res, next) {
  try {
    const response = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (response && response._id) {
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: response,
      });
    } else {
      throw new Error("User updating failed");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
}

module.exports = {
  getAllUsers,
  createUser,
  signinUser,
  updateUserById,
};
