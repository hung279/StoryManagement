const router = require("express").Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth");

router
  .route("/")
  .post(userController.addUser)
  .get(
    authMiddleware.protect,
    userController.getUsers);

router
  .route("/:id")
  .put(authMiddleware.protect, userController.updateUsers)
  .delete(authMiddleware.protect, userController.deleteUsers);

module.exports = router;
