const updatedData = {
  name: "Karan Manglani",
  email: "newemail@example.com",
  // Add other fields you want to update
};

userId = document.querySelector("p.id").textContent;

fetch(`/api/v1/users/:${userId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(updatedData),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("User data updated:", data);
  })
  .catch((error) => {
    console.error("Error updating user:", error);
  });
