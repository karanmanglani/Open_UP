const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router.route("/").post(userController.createUser);

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
