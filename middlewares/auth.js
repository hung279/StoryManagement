const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token = req.signedCookies?.token;
  console.log(req.signedCookies?.token);
  // if (req.headers.authorization?.startsWith("Bearer")) {
  //   token = req.headers.authorization.split(" ")[1];
  // }
  
  if (!token) {
    return next(new AppError("Token không tồn tại", 401));
  }

  // 2) Verification token
  try {
    const decoded = jwt.verify(token, "hung123");

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("Không thể truy cập với token này", 401));
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError("Không thể truy cập với token này", 400));
  }

  //   // 4) Check if user changed password after the token was issued
  //   if (currentUser.changedPasswordAfter(decoded.iat)) {
  //     return next(
  //       new AppError("User recently changed password! Please log in again.", 401)
  //     );
  //   }
});

exports.rolesAllowed = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Không thể thực hiện hành động này", 403));
    }
    next();
}