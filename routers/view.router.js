const router = require("express").Router();

const viewController = require("../controllers/view.controller");

router.get("/", viewController.homePage);
router.get("/:slug", viewController.detailPage);


module.exports = router;