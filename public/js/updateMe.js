import { showAlert } from "./alerts.js";

// type is either 'password' or 'data'
const updateUser = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "/api/v1/users/updateMyPassword"
        : "/api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

const selectedClubs = Array.from(
  document.querySelectorAll('input[name="clubs"]:checked')
).map((checkbox) => checkbox.value);

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();

  const updatedData = {
    // Personal Info
    name: "karan manglani",
    // name: document.querySelector(".name")
    //   ? document.querySelector(".name")
    //   : "",
    gender: document.querySelector(".gender")
      ? document.querySelector(".gender").value
      : "",

    // Educational Background
    collegeName:
      (document.querySelector("#cName")
        ? document.querySelector("#cName").value
        : "") || "",
    majorFieldOfStudy:
      (document.querySelector('input[name="branch"]:checked')
        ? document.querySelector('input[name="branch"]:checked').value
        : "") || "",

    currentYearOfStudy:
      (document.querySelector(".year")
        ? document.querySelector(".year").value
        : "") || "",

    // Interests and Likes
    hobbie:
      (document.querySelector(".hobbies")
        ? document.querySelector(".hobbies").value.split(",")
        : []) || [],
    favoriteBook:
      (document.querySelector(".book")
        ? document.querySelector(".book").value.split(",")
        : []) || [],
    favoriteMovie:
      (document.querySelector(".movie")
        ? document.querySelector(".movie").value.split(",")
        : []) || [],
    favoriteMusic:
      (document.querySelector(".music")
        ? document.querySelector(".music").value.split(",")
        : []) || [],
    favoriteSubject:
      (document.querySelector(".subject")
        ? document.querySelector(".subject").value.split(",")
        : []) || [],

    // Dislikes
    dislikedSubject:
      (document.querySelector(".dSubject")
        ? document.querySelector(".dSubject").value.split(",")
        : []) || [],
    dislikedHobbies:
      (document.querySelector(".dHobby")
        ? document.querySelector(".dHobby").value.split(",")
        : []) || [],
    triggerPoint:
      (document.querySelector(".trigger")
        ? document.querySelector(".trigger").value.split(",")
        : []) || [],

    // EXTRA CURRICULAR ACTIVITIESP
    clubs: selectedClubs || [],
    creativeHobbie:
      (document.querySelector(".cHobby")
        ? document.querySelector(".cHobby").value.split(",")
        : []) || [],
    aspiration:
      (document.querySelector(".aspiration")
        ? document.querySelector(".aspiration").value.split(",")
        : []) || [],
    challenges:
      (document.querySelector(".challenges")
        ? document.querySelector(".challenges").value.split(",")
        : []) || [],
  };

  updateUser(updatedData, "data");
});

//updateUser(updatedData, "data");
