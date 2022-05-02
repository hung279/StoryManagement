const router = require("express").Router();
const userRouter = require("./user.router");
const storyRouter = require("./story.router");
const reviewRouter = require("./review.router");
const authRouter = require("./auth.router");

const routes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/stories",
    route: storyRouter,
  },
  {
    path: "/reviews",
    route: reviewRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
