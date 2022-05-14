const Story = require("../models/story.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

module.exports = {
    homePage: catchAsync(async (req, res, next) => {
        const stories = await Story.find();
        res.render("client/home", {
            stories: stories,
        });
    }),
    detailPage: catchAsync(async (req, res, next) => {
        const story = await Story.findOne({ slug: req.params.slug });
        res.render("client/detail", {
            story: story
        })
    }),
    login: catchAsync(async (req, res, next) => {
        res.render("client/login-signup");
    })
}