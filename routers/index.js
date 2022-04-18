const router = require('express').Router();
const userRouter = require("./user.router");
const storyRouter = require("./story.router");
const reviewRouter = require("./review.router");

const routes = [
    userRouter,
    storyRouter,
    reviewRouter
];

routes.forEach((route) => {
    router.use("/api", route);
});

module.exports = router;
