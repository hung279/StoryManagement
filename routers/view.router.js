const router = require("express").Router();

const viewController = require("../controllers/view.controller");
const authMiddleware = require("../middlewares/auth")

router.get("/", viewController.homePage);

router.get("/stories/:slug", viewController.detailPage);

router.get("/stories/show/:storyId", viewController.detailStory);

module.exports = router;