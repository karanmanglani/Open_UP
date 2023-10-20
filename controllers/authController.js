const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "Success",
    token,
    data: {
      user: newUser,
    },
  });
};
