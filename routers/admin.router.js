const router = require("express").Router();

const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth")

router.get("/", authMiddleware.protect, adminController.homePage);

router.get("/login", adminController.login);

router.get("/manage", authMiddleware.protect, adminController.managePage);

router.get("/manage/create", authMiddleware.protect, adminController.createPage);

router.get("/manage/edit/:id", authMiddleware.protect, adminController.editPage);

module.exports = router;