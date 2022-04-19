const router = require("express").Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.signup);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.changePassword);

module.exports = router;
