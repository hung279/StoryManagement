const router = require("express").Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth");

router
  .route("/users")
  .post(userController.addUser)
  .get(authMiddleware.protect, userController.getUsers);

router
  .route("/users/:id")
  .put(authMiddleware.protect, userController.updateUsers)
  .delete(authMiddleware.protect, userController.deleteUsers);

module.exports = router;
