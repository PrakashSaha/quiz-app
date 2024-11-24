<template>
    <div>
      <h3>Quiz Results</h3>
      <div v-if="allResults.length">
        <div v-for="(userResult, userIndex) in allResults" :key="userIndex" class="user-results">
          <!-- Display the user UID from each result -->
          <h4>User: {{ userResult.userUID || "Anonymous" }}</h4>
          <p>Score: {{ userResult.correctAnswers }} / {{ userResult.totalQuestions }}</p>
          <div v-for="(result, index) in userResult.results" :key="index">
            <p :class="{ correct: result.isCorrect, incorrect: !result.isCorrect }">
                Q{{ index + 1 }}: {{ result.isCorrect ? "Correct" : "Wrong" }}
            </p>
          </div>
          <!-- <ul>
            <li v-for="(result, index) in userResult.results" :key="index">
              <strong>Q{{ index + 1 }}:</strong> {{ result.question }} -
              <span :class="{ correct: result.isCorrect, incorrect: !result.isCorrect }">
                {{ result.selectedAnswer }} ({{ result.isCorrect ? "Correct" : "Wrong" }})
              </span>
            </li>
          </ul> -->
        </div>
      </div>
      <div v-else>
        <p>No results found.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  
  // Retrieve all results from localStorage
  const allResults = JSON.parse(localStorage.getItem("quizScores")) || [];
  
  const router = useRouter();
  
  // Reload the game and navigate back to the quiz page
  function reloadGame() {
    localStorage.removeItem("quizScores"); // Clear all stored results
    router.push("/"); // Navigate to the quiz home page
  }
  </script>
  
  <style scoped>
  .correct {
    color: green;
  }
  .incorrect {
    color: red;
  }
  .user-results {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  