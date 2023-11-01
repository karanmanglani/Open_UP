const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.getBase);
router.get("/signup", viewsController.getSignupForm);
router.get("/login", viewsController.getLoginForm);
router.get(
  "/me",
  authController.isLoggedIn,
  authController.protect,
  viewsController.getAccount
);

router.get("/findFriend", authController.isLoggedIn, viewsController.getFriend);
router.get("/updateMe", authController.isLoggedIn, viewsController.getUpdateMe);

router.post(
  "/submit-user-data",
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
