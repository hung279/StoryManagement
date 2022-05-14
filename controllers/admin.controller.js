const Story = require("../models/story.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

module.exports = {
    homePage: catchAsync(async (req, res, next) => {
        res.render('admin');
    }),
    managePage: catchAsync(async (req, res, next) => {
        res.render('admin/manage');
    }),
    createPage: catchAsync(async (req, res, next) => {
        res.render("admin/create");
    }),
    editPage: catchAsync(async (req, res, next) => {
        const story = await Story.findById(req.params.id);

        if (!story) return next(new AppError("Story không tồn tại", 404));

        res.render("admin/edit", { story });
    })
}