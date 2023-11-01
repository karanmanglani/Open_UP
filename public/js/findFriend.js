name = document.querySelector("p.name").textContent;
console.log(name);

fetch(`/api/fetchMatchingNames?targetName=${name}`)
  .then((response) => response.json())
  .then((data) => {
    const friends = data; // Data received from the server
    console.log(friends);
    // Create a <p> element
    const pElement = document.createElement("p");

    // Set the content of the <p> element with the names
    pElement.textContent = `Friends: ${friends}`;

    // Append the <p> element to the HTML document
    document.body.appendChild(pElement);
  })
  .catch((error) => {
    console.error("Error fetching matching names:", error);
  });
