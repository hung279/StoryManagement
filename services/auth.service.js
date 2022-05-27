const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const userService = require("./user.service");

const signToken = (id) => {
  return jwt.sign({ id }, "hung123", {
    expiresIn: "30m",
  });
};

module.exports = {
  login: async (username, password) => {
    if (!username || !password)
      return next(new AppError("Tài khoản hoặc mật khẩu chưa được nhập", 400));
  
    const user = await userService.getUserByUsername(username);
  
    if (!user || !(await user.isPasswordMatch(password)))
      return next(new AppError("Tài khoản hoặc mật khẩu không hợp lệ", 401));
  
    const token = signToken(user._id);
    
    return token;
  },

//   signup: catchAsync(async (req, res, next) => {
//     const newUser = await User.create({
//       full_name: req.body.full_name,
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password,
//       password_confirm: req.body.password_confirm,
//     });
    
//     res.status(201).json({ status: "success" });
//   }),

//   forgetPassword: catchAsync(async (req, res, next) => {
//     const user = await User.findOne({ username: req.body.username });
  
//     if (!user) {
//       return next(new AppError("User không tồn tại", 404));
//     }
  
//     const resetToken = user.createPasswordResetToken();
//     await user.save({ validateBeforeSave: false });
//     //req.protocol = http, req.get('host') = localhost:3000
//     const resetURL = `${req.protocol}://${req.get(
//       "host"
//     )}/auth/reset-password/${resetToken}`;
  
//     res.status(200).json({ resetURL });
//   }),
  
//   changePassword: catchAsync(async (req, res, next) => {
//     const user = await User.findOne({
//       passwordResetToken: req.params.resetToken,
//       passwordResetExpires: { $gte: Date.now() },
//     });
  
//     if (!user) {
//       return next(new AppError("User not found", 400));
//     }
  
//     user.password = req.body.password;
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save();
  
//     res.status(200).json({ message: "change successfully" });
//   })
}