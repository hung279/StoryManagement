const mongoose = require("mongoose");

const storySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên truyện là trường bắt buộc"],
    },
    image: {
      type: String,
      required: [true, "Ảnh bìa truyện là trường bắt buộc"],
    },
    chapter: {
      type: String,
    },
    introduce: {
      type: String,
      required: [true, "Giới thiệu là trường bắt buộc"],
    },
    author: {
      type: String,
      required: [true, "Tác giả là trường bắt buộc"],
    },
    released: {
      type: Date,
      required: [true, "Thời gian phát hành là trường bắt buộc"],
    },
    category: {
      type: String,
      required: [true, "Thể loại là trường bắt buộc"],
    },
  },
  {
    timestamp: true,
  }
);

const Story = mongoose.model("Story", storySchema);

module.exports = Story;