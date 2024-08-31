const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user-controller");

// Defines routes for users
router.get("/", userController.getUsers);
router.post("/", userController.createUser);

router.get("/:userId", userController.getSingleUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

// Defines routes for friends
router.post("/:userId/friends/:friendId", userController.addFriend);
router.delete("/:userId/friends/:friendId", userController.removeFriend);

module.exports = router;
