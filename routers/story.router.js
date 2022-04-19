const router = require("express").Router();

const storyController = require("../controllers/story.controller");
const authMiddleware = require("../middlewares/auth");

router.route("/storys").get(storyController.getStorys);

router.use(authMiddleware.protect, authMiddleware.rolesAllowed("admin"));

router.route("/storys").post(storyController.getStorys);

router
  .route("/storys/:id")
  .put(storyController.updateStory)
  .delete(storyController.deleteStory);

module.exports = router;
