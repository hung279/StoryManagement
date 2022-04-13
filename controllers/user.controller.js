const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const userController = {
  addUser: catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({ status: "success", data: newUser });
  }),

  getUsers: catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({ status: "success", data: users });
  }),

  updateUsers: catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });

    if (!user) return next(new AppError("User không tồn tại", 404));

    res.status(200).json({ status: "success", message: "update thành công" });
  }),

  deleteUsers: catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return next(new AppError("User không tồn tại", 404));

    res.status(200).json({ status: "success", message: "delete thành công" });
  }),
};

module.exports = userController;
