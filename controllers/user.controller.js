const httpStatus = require("http-status");
const pick = require("../utils/pick");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { userService } = require("../services");

const addUser = catchAsync(async (req, res, next) => {
  const newUser = await userService.createUser(req.body);

  res.status(httpStatus.CREATED).json({ status: "success", data: newUser });
});

const getUsers = catchAsync(async (req, res, next) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const users = await userService.queryUsers(filter, options);

  res.status(httpStatus.OK).json(users);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  res.status(httpStatus.OK).json({ status: "success", data: user });
});

const updateUser = catchAsync(async (req, res, next) => {
  const user = await userService.updateUserById(req.userId, req.body);

  res
    .status(httpStatus.OK)
    .json({ status: "success", message: "update thành công" });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const user = await userService.deleteUserById(req.params.id);

  res
    .status(httpStatus.OK)
    .json({ status: "success", message: "delete thành công" });
});

module.exports = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
