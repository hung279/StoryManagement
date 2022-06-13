const mongoose = require("mongoose");
const { toJSON } = require("./plugins");
const { paginate } = require("./plugins");
const slugify = require("slugify");

const storySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên truyện là trường bắt buộc"],
    },
    thumbnail: {
      type: String,
      required: [true, "Ảnh bìa truyện là trường bắt buộc"],
    },
    chapter: {
      type: String,
    },
    slug: {
      type: String,
    },
    introduce: {
      type: String,
      required: [true, "Giới thiệu là trường bắt buộc"],
    },
    content: {
      type: String,
      required: [true, "Noi dung la truong bat buoc"],
    },
    author: {
      type: String,
      required: [true, "Tác giả là trường bắt buộc"],
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

// add plugin that converts mongoose to json
storySchema.plugin(toJSON);
storySchema.plugin(paginate);

storySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
