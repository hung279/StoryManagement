const Story = require("../models/story.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const storyController = {
  aliasTopTours: (req, res, next) => {
    req.query.limit = '10';
    req.query.sort = '-rating';
    req.query.fields = 'name, chapter, author, category, rating';
    next();
  },

  addStory: catchAsync(async (req, res, next) => {
    const newStory = await Story.create(req.body);
    
    res.status(201).json({ status: "success", data: newStory });
  }),

  getStorys: catchAsync(async (req, res, next) => {
    const storys = await Story.find();

    res.status(200).json({ status: "success", data: storys });
  }),

  updateStory: catchAsync(async (req, res, next) => {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });

    if (!story) return next(new AppError("Story không tồn tại", 404));

    res.status(200).json({ status: "success", message: "update thành công" });
  }),

  deleteStory: catchAsync(async (req, res, next) => {
    const story = await Story.findByIdAndDelete(req.params.id);

    if (!story) return next(new AppError("Story không tồn tại", 404));

    res.status(200).json({ status: "success", message: "delete thành công" });
  }),
};

module.exports = storyController;
