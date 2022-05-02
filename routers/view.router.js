const router = require("express").Router();

const viewController = require("../controllers/view.controller");
const authMiddleware = require("../middlewares/auth")

router.get("/", authMiddleware.protect, viewController.homePage);

router.get("/stories/:slug", authMiddleware.protect, viewController.detailPage);

router.get("/auth/login", viewController.login);


module.exports = router;