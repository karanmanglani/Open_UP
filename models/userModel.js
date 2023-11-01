const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Please tell us your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  gender: {
    type: String,
  },

  photo: String,

  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },

  //EDUCATIONAL BACKGROUND
  collegeName: {
    type: String,
  },

  majorFieldOfStudy: {
    type: String,
  },

  currentYearOfStudy: {
    type: Number,
  },

  //INTERESTS AND LIKES
  hobbie: {
    type: ["string"],
  },

  favoriteBook: {
    type: ["string"],
  },

  favoriteMovie: {
    type: ["string"],
  },

  favoriteMusic: {
    type: ["string"],
  },

  favoriteSubject: {
    type: ["string"],
  },

  //DISLIKES
  dislikedSubject: {
    type: ["string"],
  },
  dislikedHobbies: {
    type: ["string"],
  },
  triggerPoint: {
    type: ["string"],
  },

  //EXTRA CURRICULAR ACTIVITIES
  clubs: {
    type: ["string"],
  },
  favoriteSport: {
    type: ["string"],
  },
  creativeHobbie: {
    type: ["string"],
  },
  aspiration: {
    type: ["string"],
  },
  challenges: {
    type: ["string"],
  },
});

userSchema.pre("save", async function (next) {
  // run this function iff password is modified
  if (!this.isModified("password")) return next();

  // Hashing password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
