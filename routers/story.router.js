const router = require("express").Router();

const storyController = require("../controllers/story.controller");
const authMiddleware = require("../middlewares/auth");

router.route("/").get(storyController.getStories);

router
  .route("/")
  .post(
    authMiddleware.protect,
    authMiddleware.rolesAllowed("admin"),
    storyController.addStory
  );

router
  .route("/:storyId")
  .patch(
    authMiddleware.protect,
    authMiddleware.rolesAllowed("admin"),
    storyController.updateStory
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.rolesAllowed("admin"),
    storyController.deleteStory
  );

module.exports = router;
