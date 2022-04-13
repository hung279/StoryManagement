const router = require('express').Router();

const userController = require('../controllers/user.controller');

router
    .route("/users")
    .post(userController.addUser)
    .get(userController.getUsers);

router
    .route("/users/:id")
    .put(userController.updateUsers)
    .delete(userController.deleteUsers);

module.exports = router;