import { showAlert } from "./alerts.js";

const updatedData = {
  name: "Karan Manglani",
  email: "newemail@example.com",
  // Add other fields you want to update
};

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

updateUser(updatedData, "data");
