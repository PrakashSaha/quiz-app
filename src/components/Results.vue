<template>
  <div class="container">
    <h3>Quiz Results</h3>
    <div v-if="allResults.length" class="result">
      <div v-for="(userResult, userIndex) in allResults" :key="userIndex" class="user-results">
        <!-- Display the user UID from each result -->
        <h4>User: {{ userResult.userUID || "Anonymous" }}</h4>
        <p>Score: {{ userResult.correctAnswers }} / {{ userResult.totalQuestions }}</p>
        <div v-for="(result, index) in userResult.results" :key="index">
          <p :class="{ correct: result.isCorrect, incorrect: !result.isCorrect }">
            Q{{ index + 1 }}: {{ result.isCorrect ? "Correct" : "Wrong" }}
          </p>
        </div>
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
.container h3{
 color: #f9f9f9;
}
.result {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin: 20px;

}

.user-results {
  background: rgba(255, 215, 0, 0.2);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 300px; /* Fixed width for uniform card sizes */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 3px solid #ffd700;

}

.user-results:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
}

h4 {
  color: #333;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

p {
  font-size: 1rem;
  margin: 0.25rem 0;
}

.correct {
  color: #4caf50; /* Green */
  font-weight: bold;
}

.incorrect {
  color: #f44336; /* Red */
  font-weight: bold;
}

h3 {
  text-align: center;
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}
</style>



 <!-- <ul>
            <li v-for="(result, index) in userResult.results" :key="index">
              <strong>Q{{ index + 1 }}:</strong> {{ result.question }} -
              <span :class="{ correct: result.isCorrect, incorrect: !result.isCorrect }">
                {{ result.selectedAnswer }} ({{ result.isCorrect ? "Correct" : "Wrong" }})
              </span>
            </li>
          </ul> -->