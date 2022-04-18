const router = require('express').Router();

const storyController = require('../controllers/story.controller');

router
    .route("/storys")
    .post(storyController.addStory)
    .get(storyController.getStorys);

router
    .route("/storys/:id")
    .put(storyController.updateStory)
    .delete(storyController.deleteStory);

module.exports = router;