/* eslint-disable */

import { showAlert } from "./alerts.js";

const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      console.log("Success");
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password1").value;
  const passwordConfirm = document.getElementById("password2").value;
  if (password == passwordConfirm) {
    signup(name, email, password, passwordConfirm);
  }
});

// let submit = document.getElementById("submit");
// console.log(submit);
// submit.addEventListener("click", fun);

// function fun() {
//   let username = document.getElementById("username").value;
//   let name = document.getElementById("name").value;
//   let email = document.getElementById("email").value;
//   var p1 = document.getElementById("password1").value;
//   var p2 = document.getElementById("password2").value;
//   console.log(p1);
//   console.log(p2);
//   let wrongoutput = document.getElementById("wrongoutput");
//   if (p1 != p2) {
//     wrongoutput.setAttribute("style", "color: blue");
//     wrongoutput.textContent = "Password and Confirm Password are not the same";
//   } else {
//     wrongoutput.textContent = "";
//   }
// }
