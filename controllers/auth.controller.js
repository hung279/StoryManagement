const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const authService = require("../services/auth.service");

module.exports = {
  login: catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    
    res.cookie('token', token, { signed: true });
    res.status(200).json({ status: "success", token });
  }),

  signup: catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      full_name: req.body.full_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      password_confirm: req.body.password_confirm,
    });
    
    res.status(201).json({ status: "success" });
  }),

  forgetPassword: catchAsync(async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
  
    if (!user) {
      return next(new AppError("User không tồn tại", 404));
    }
  
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    //req.protocol = http, req.get('host') = localhost:3000
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/auth/reset-password/${resetToken}`;
  
    res.status(200).json({ resetURL });
  }),
  
  changePassword: catchAsync(async (req, res, next) => {
    const user = await User.findOne({
      passwordResetToken: req.params.resetToken,
      passwordResetExpires: { $gte: Date.now() },
    });
  
    if (!user) {
      return next(new AppError("User not found", 400));
    }
  
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  
    res.status(200).json({ message: "change successfully" });
  })
}