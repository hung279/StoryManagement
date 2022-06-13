const router = require("express").Router();
const userRouter = require("./user.router");
const storyRouter = require("./story.router");

const routes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/stories",
    route: storyRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
