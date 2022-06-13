const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const config = require("../config/config");
const mongoose = require("mongoose");

exports.protect = catchAsync(async (req, res, next) => {
  let tokens = req.signedCookies?.tokens;
  
  if (!req.originalUrl.includes("/api") && !tokens) {
    return res.redirect("/admin/login");
  }

  if (!tokens) {
    return next(new Error("Cookie không tìm thấy"));
  }
  
  let { access } = tokens;

  const payload = jwt.verify(access.token, config.jwt.secret);
  
  if(payload.exp*1000 < Date.now()) {
    return res.redirect("/admin/login");
  }

  if (payload) {
    req.userId = payload.sub;
    return next();
  }
});

exports.rolesAllowed = (...roles) => async (req, res, next) => {
    const currentUser = await User.findById(req.userId);
    console.log(currentUser.role);
    if (!roles.includes(currentUser.role)) {
      return next(new AppError("Không thể thực hiện hành động này", 403));
    }
    next();
}