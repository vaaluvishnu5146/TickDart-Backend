const {
  getAllUsers,
  createUser,
  signinUser,
  updateUserById,
} = require("../Controllers/User.controller");

const UserRouter = require("express").Router();

UserRouter.get("/", getAllUsers);

UserRouter.post("/create", createUser);

UserRouter.post("/login", signinUser);

UserRouter.patch("/update/:id", updateUserById);

module.exports = UserRouter;
