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

// Define the route for updating user data
router.put("/:id", async (req, res) => {
  const userId = req.params._id; // Extract the user's ID from the URL
  const updatedUserData = req.body; // Data to update (e.g., name, password, email, etc.)

  try {
    // Find the user by ID and update their data
    const user = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user); // Respond with the updated user data
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});
module.exports = router;
