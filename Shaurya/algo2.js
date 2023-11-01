const students = [
  { 
    name: 'Shaurya',
    hobbies: ['Reading', 'Painting'],
    major: 'Computer Science',
    gender: 'Female' 
  },
  {
    name: 'Karan',
    hobbies: ['Painting', 'Music'], 
    major: 'IT Engineering',
    gender: 'Male' 
  },
  { 
    name: 'Arun', 
    hobbies: ['Reading', 'Sports'], 
    major: 'Frontend', 
    gender: 'Male'  
  },
  {
    name: 'Naman', 
    hobbies: ['Music', 'Sports'], 
    major: 'Computer Science', 
    gender: 'Male' 
  },
  { 
    name: 'Sonali', 
    hobbies: ['Reading', 'Sports'], 
    major: 'Computer Science', 
    gender: 'Female' 
  },
];

// Define matching criteria and weights
const criteria = [
  { name: 'Gender', weight: 0.1, attribute: 'gender' },
  { name: 'College Name', weight: 0.1, attribute: 'collegeName' },
  { name: 'Major Field of Study', weight: 0.2, attribute: 'majorFieldOfStudy' },
  { name: 'Hobbies', weight: 0.9, attribute: 'hobbies' },
  { name: 'Favourite Books', weight: 0.6, attribute: 'favouriteBooks' },
  { name: 'Favourite Movies', weight: 0.6, attribute: 'favouriteMovies' },
  { name: 'Favourite Music', weight: 0.5, attribute: 'favouriteMusic' },
  { name: 'Favourite Subjects', weight: 0.2, attribute: 'favouriteSubjects' },
  { name: 'Disliked Subject', weight: 0.3, attribute: 'dislikedSubject' },
  { name: 'Disliked Hobbies', weight: 0.3, attribute: 'dislikedHobbies' },
  { name: 'Trigger Point', weight: 0.4, attribute: 'triggerPoint' },
];

// Matching threshold ---> defines strictness of matching
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

  for (const otherStudent of students) {
    if (otherStudent === student) continue; // Skip comparing the student to themselves

    const similarityScore = calculateSimilarityScore(student, otherStudent);

    if (similarityScore >= threshold) {
      potentialFriends.push({ name: otherStudent.name, similarityScore });
    }
  }

  return potentialFriends;
}
const studentToMatch = students[0];
const potentialFriends = findPotentialFriends(studentToMatch, matchingThreshold);

console.log(`Potential Friends for ${studentToMatch.name}:`);
for (const friend of potentialFriends) {
  console.log(`${friend.name} (Similarity Score: ${friend.similarityScore})`);
}