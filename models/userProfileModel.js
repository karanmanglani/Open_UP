const mongoose = require('mongoose');
const validator = require("validator");

//Creating Schema

const userProfileSchema = new mongoose.Schema({
    //PERSONAL INFORMATION
    fullName: {
      type: String,
      required: [true, "Please tell us your name"],
    },
  
    dateOfBirth: {
      type: String,
      required: [true, "Please enter your DOB"]
    },
  
    gender: {
      type: String,
      required: [true, 'Please Enter Your Gender']
    },
  
    phoneNumber: {
      type: Number,
      required: [true, 'Please Enter Your Number']
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please tell us your email"],
      lowercase: true,
      //validate: [validator.isEmail, "Please provide a valid email"],
    },
  
  
    //EDUCATIONAL BACKGROUND
    collegeName: {
      type: String,
      required: [true, 'Please Enter Your College Name']
    },
  
    majorFieldOfStudy: {
      type: String,
      required: [true, 'Please Enter Your Major Field of study']
    },
  
    currentYearOfStudy: {
      type: Number,
      required: [true, 'Please Enter Your Current year of study']
    },
  
    //INTERESTS AND LIKES
    hobbie:{
      type: ["string"]
    },
  
    favoriteBook:{
      type: ["string"]
    },  
  
    favoriteMovie:{
      type: ["string"]
    },
  
    favoriteMusic:{
      type: ["string"]
    },
    
    favoriteSubject:{
      type: ["string"]
    },
  
    //DISLIKES
    dislikedSubject: {
      type: ["string"]
    },
    dislikedHobbies: {
      type: ["string"]
    },
    triggerPoint: {
      type: ["string"]
    },

    //EXTRA CURRICULAR ACTIVITIES
    clubs: {
      type: ["string"]
    },
    favoriteSport: {
      type: ["string"]
    },
    creativeHobbie: {
      type: ["string"]
    },
    aspiration: {
      type: ["string"]
    },
    challenges: {
      type: ["string"]
    }
})


//Creating Model
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;