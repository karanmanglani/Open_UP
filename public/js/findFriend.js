name = document.querySelector("span.name").textContent;

// Import Axios (if not already imported)

// Make a GET request to the API endpoint
axios
  .get("/api/v1/users/getAll")
  .then((response) => {
    // Handle the response data
    const users = response.data.data.users;
    console.log("All users:", users);

    const User = users.find((user) => user.name === name);

    // Define matching criteria and weights
    const criteria = [
      { name: "Gender", weight: 0.1, attribute: "gender" },
      { name: "College Name", weight: 0.1, attribute: "collegeName" },
      {
        name: "Major Field of Study",
        weight: 0.2,
        attribute: "majorFieldOfStudy",
      },
      { name: "Hobbies", weight: 0.9, attribute: "hobbies" },
      { name: "Favourite Books", weight: 0.6, attribute: "favouriteBooks" },
      { name: "Favourite Movies", weight: 0.6, attribute: "favouriteMovies" },
      { name: "Favourite Music", weight: 0.5, attribute: "favouriteMusic" },
      {
        name: "Favourite Subjects",
        weight: 0.2,
        attribute: "favouriteSubjects",
      },
      { name: "Disliked Subject", weight: 0.3, attribute: "dislikedSubject" },
      { name: "Disliked Hobbies", weight: 0.3, attribute: "dislikedHobbies" },
      { name: "Trigger Point", weight: 0.4, attribute: "triggerPoint" },
    ];

    const matchingThreshold = 0.6;

    // Function to calculate the similarity score between two students
    function calculateSimilarityScore(studentA, studentB) {
      let totalWeightedScore = 0;
      let totalWeight = 0;

      for (const criterion of criteria) {
        const attribute = criterion.attribute;
        if (studentA[attribute] === studentB[attribute]) {
          const normalizedScore = 1; // Perfect match
          totalWeightedScore += criterion.weight * normalizedScore;
          totalWeight += criterion.weight;
        }
      }

      if (totalWeight === 0) return 0; // No match in any criteria

      return totalWeightedScore / totalWeight;
    }

    // Function to find potential friends for a given student
    function findPotentialFriends(student, threshold) {
      const potentialFriends = [];

      for (const otherUser of users) {
        if (otherUser === User) continue; // Skip comparing the student to themselves

        const similarityScore = calculateSimilarityScore(student, otherUser);

        if (similarityScore >= threshold) {
          potentialFriends.push({ name: otherUser.name, similarityScore });
        }
      }

      return potentialFriends;
    }

    const potentialFriends = findPotentialFriends(User, matchingThreshold);
    console.log(`Potential Friends for ${User.name}:`);
    for (const friend of potentialFriends) {
      document.querySelector(
        ".suggestedFriends"
      ).textContent = ` Suggested friends for you are ${friend.name} (Similarity Score: ${friend.similarityScore})`;
      console.log(
        `${friend.name} (Similarity Score: ${friend.similarityScore})`
      );
    }
  })
  .catch((error) => {
    console.error("Error fetching all users:", error);
  });

// fetch(`/api/fetchMatchingNames?targetName=${name}`)
//   .then((response) => response.json())
//   .then((data) => {
//     const friends = data; // Data received from the server
//     console.log(friends);
//     // Create a <p> element
//     const pElement = document.createElement("p");

//     // Set the content of the <p> element with the names
//     pElement.textContent = `Friends: ${friends}`;

//     // Append the <p> element to the HTML document
//     document.body.appendChild(pElement);
//   })
//   .catch((error) => {
//     console.error("Error fetching matching names:", error);
//   });
