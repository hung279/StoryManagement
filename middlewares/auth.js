const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.protect = catchAsync(async (req, res, next) => {
  let tokens = req.signedCookies?.token;
  console.log(tokens);
  if (!req.originalUrl.includes("/api") && !tokens) {
    return res.redirect("/admin/login");
  }

  if (!tokens) {
    return next(new Error("Cookie không tìm thấy"));
  }

  const payload = jwt.verify(tokens, "hung123");

  if (payload) {
    req.userId = payload.sub;
    return next();
  }
});

exports.rolesAllowed = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Không thể thực hiện hành động này", 403));
    }
    next();
}