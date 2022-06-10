const mongoose = require("mongoose");
const { toJSON } = require('./plugins');
const { paginate } = require('./plugins');
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Tên là trường bắt buộc"],
    },
    email: {
      type: String,
      required: [true, "Email là trường bắt buộc"],
      trim: true,
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Sai định dạng email",
      // ],
    },
    username: {
      type: String,
      required: [true, "Tên tài khoản là trường bắt buộc"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Mật khẩu là trường bắt buộc"],
    },
    avatar: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Nam", "Nữ", "Khác"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamp: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.isPasswordMatch = async function(password) {
  return bcrypt.compare(password, this.password);
}

userSchema.statics.isEmail = function (email) {
  return validator.isEmail(email);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
