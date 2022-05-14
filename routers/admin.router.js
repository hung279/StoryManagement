const router = require("express").Router();

const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth")

router.get("/", adminController.homePage);

router.get("/manage", adminController.managePage);

router.get("/manage/create", adminController.createPage);


router.get("/manage/edit/:id", adminController.editPage);

module.exports = router;