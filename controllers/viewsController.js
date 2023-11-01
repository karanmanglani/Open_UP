const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// exports.getSignUpForm = (req, res) => {
//   res.status(200).render("signUp", {
//     title: "Create a new Account",
//   });
// };

exports.getBase = (req, res) => {
  res.status(200).render("base", {
    title: "Base",
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render("signUp", {
    title: "Sign Up",
  });
};

exports.getChat = (req, res) => {
  res.status(200).render("Chat", {
    title: "Chat",
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your account",
  });
};

exports.getFriend = (req, res) => {
  res.status(200).render("findFriend", {
    title: "Find Friend",
  });
};

exports.getUpdateMe = (req, res) => {
  res.status(200).render("updateProfile", {
    title: "Update Profile",
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render("account", {
    title: "Your account",
    user: updatedUser,
  });
});
