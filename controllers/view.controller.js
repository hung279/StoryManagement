const Story = require("../models/story.model");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const { storyService } = require("../services");
const AppError = require("../utils/appError");

module.exports = {
  homePage: catchAsync(async (req, res, next) => {
    const filter = pick(req.query, ["name", "role"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const stories = await storyService.queryStorys(filter, options);
    console.log(stories);
    res.render("client/home", {
      stories: stories,
      current: stories.page,
      pages: stories.totalPages
    });
  }),
  detailPage: catchAsync(async (req, res, next) => {
    const story = await Story.findOne({ slug: req.params.slug });
    res.render("client/detail", {
      story: story,
    });
  }),
  detailStory: catchAsync(async (req, res, next) => {
    const story = await storyService.getStoryById(req.params.storyId);
    res.render("client/story", {
      story: story,
    });
  }),
  login: catchAsync(async (req, res, next) => {
    res.render("client/login-signup");
  }),
};
