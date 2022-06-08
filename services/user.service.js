const httpStatus = require("http-status");
const User = require("../models/user.model");
const AppError = require("../utils/appError");

const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const createUser = async (userBody) => {
  return User.create(userBody);
};

const getUserById = async (id) => {
  const user = User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  Object.assign(user, updateBody);
  await user.save();

  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);

  await user.remove();
  return user;
};

const getUserByUsername = async (username) => {
  const user = User.findOne({ username });

  return user;
};

module.exports = {
  queryUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByUsername,
};
