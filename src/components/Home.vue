<script setup>
import { ref, onMounted } from "vue";
import { auth } from "../firebase"; // Adjust the path if needed

const Questions = ref([
  {
    index: 1,
    question: "What is the capital of France?",
    options: [
      { text: "Berlin", isCorrect: false },
      { text: "Madrid", isCorrect: false },
      { text: "Paris", isCorrect: true },
      { text: "Rome", isCorrect: false },
    ],
  },
  {
    index: 2,
    question: "Which planet is known as the Red Planet?",
    options: [
      { text: "Earth", isCorrect: false },
      { text: "Mars", isCorrect: true },
      { text: "Jupiter", isCorrect: false },
      { text: "Venus", isCorrect: false },
    ],
  },
  {
    index: 3,
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      { text: "Charles Dickens", isCorrect: false },
      { text: "William Shakespeare", isCorrect: true },
      { text: "Mark Twain", isCorrect: false },
      { text: "Jane Austen", isCorrect: false },
    ],
  },
  {
    index: 4,
    question: "What is the largest mammal on Earth?",
    options: [
      { text: "Elephant", isCorrect: false },
      { text: "Blue Whale", isCorrect: true },
      { text: "Giraffe", isCorrect: false },
      { text: "Hippopotamus", isCorrect: false },
    ],
  },
  {
    index: 5,
    question: "Which element has the chemical symbol 'O'?",
    options: [
      { text: "Oxygen", isCorrect: true },
      { text: "Gold", isCorrect: false },
      { text: "Osmium", isCorrect: false },
      { text: "Hydrogen", isCorrect: false },
    ],
  },
  {
    index: 6,
    question: "What is the square root of 64?",
    options: [
      { text: "6", isCorrect: false },
      { text: "8", isCorrect: true },
      { text: "10", isCorrect: false },
      { text: "12", isCorrect: false },
    ],
  },
  {
    index: 7,
    question: "What is the fastest land animal?",
    options: [
      { text: "Lion", isCorrect: false },
      { text: "Cheetah", isCorrect: true },
      { text: "Horse", isCorrect: false },
      { text: "Leopard", isCorrect: false },
    ],
  },
  {
    index: 8,
    question: "Who painted the Mona Lisa?",
    options: [
      { text: "Vincent van Gogh", isCorrect: false },
      { text: "Leonardo da Vinci", isCorrect: true },
      { text: "Pablo Picasso", isCorrect: false },
      { text: "Claude Monet", isCorrect: false },
    ],
  },
  {
    index: 9,
    question: "Which gas do plants primarily use during photosynthesis?",
    options: [
      { text: "Oxygen", isCorrect: false },
      { text: "Carbon Dioxide", isCorrect: true },
      { text: "Nitrogen", isCorrect: false },
      { text: "Hydrogen", isCorrect: false },
    ],
  },
  {
    index: 10,
    question: "What is the largest continent by area?",
    options: [
      { text: "Africa", isCorrect: false },
      { text: "Asia", isCorrect: true },
      { text: "North America", isCorrect: false },
      { text: "Europe", isCorrect: false },
    ],
  },
]);

function shuffleQuestions() {
  Questions.value = Questions.value.sort(() => Math.random() - 0.5);
  Questions.value.forEach((value) => {
    value.options = value.options.sort(() => Math.random() - 0.5);
  });
}

shuffleQuestions();

const selectedAnswers = ref({});
const currentQuestionIndex = ref(0);
const quizResults = ref(null);

// Timer variables
const timer = ref(30); 
let timerInterval = null;

// Start the timer
function startTimer() {
  timer.value = 30; 
  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      stopTimer();
      submitQuiz(); 
    }
  }, 1000);
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

function reloadGame() {
  selectedAnswers.value = {};
  currentQuestionIndex.value = 0;
  quizResults.value = null;
  shuffleQuestions();
  startTimer(); // Restart the timer
}

function selectAnswer(optionIndex) {
  selectedAnswers.value[currentQuestionIndex.value] = optionIndex;
}

function goToNextQuestion() {
  if (currentQuestionIndex.value < Questions.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    submitQuiz();
  }
}

function submitQuiz() {
  stopTimer(); // Stop the timer
  const results = Questions.value.map((question, questionIndex) => {
    const selectedOptionIndex = selectedAnswers.value[questionIndex];
    const selectedOption =
      question.options[selectedOptionIndex] || { text: "No answer" };
    return {
      question: question.question,
      selectedAnswer: selectedOption.text,
      isCorrect: selectedOption.isCorrect || false,
    };
  });

  const correctAnswers = results.filter((result) => result.isCorrect).length;
  const totalQuestions = Questions.value.length;

  const user = auth.currentUser;
  const userUID = user ? user.uid : "Anonymous";

  const existingScores = JSON.parse(localStorage.getItem("quizScores")) || [];
  const newResult = {
    userUID,
    correctAnswers,
    totalQuestions,
    results,
    timestamp: new Date().toISOString(),
  };

  existingScores.push(newResult);
  localStorage.setItem("quizScores", JSON.stringify(existingScores));

  quizResults.value = { results, correctAnswers, totalQuestions };

  console.log(existingScores);
  console.log(newResult);
}

// Start the timer when the component is mounted
onMounted(() => {
  startTimer();
});
</script>

<template>
  <div>
    <div v-if="!quizResults">
      <div class="millionaire-container">
        <!-- Header -->
        <header class="header">
          <h1>Quiz Application</h1>
        </header>
        <p class="timer">Time Remaining: {{ timer }} seconds</p>

        <!-- Question Area -->
        <div class="question-area">
          <div class="question-box">
            <p class="question-text">{{ Questions[currentQuestionIndex].question }}</p>
          </div>
        </div>

        <!-- Answer Options -->
        <div class="answers">
          <button
            class="answer"
            v-for="(option, optionIndex) in Questions[currentQuestionIndex].options"
            :key="optionIndex"
            :class="{ selected: selectedAnswers[currentQuestionIndex] === optionIndex }"
            @click="selectAnswer(optionIndex)"
          >
            {{ option.text }}
          </button>
        </div>

        <button class="answer" @click="goToNextQuestion">
          {{ currentQuestionIndex < Questions.length - 1 ? "Next" : "Submit" }}
        </button>
      </div>
    </div>

    <div v-else>
      <h3>Quiz Results</h3>
      <p>{{ quizResults.correctAnswers }} / {{ quizResults.totalQuestions }}</p>
      <div v-for="(result, index) in quizResults.results" :key="index" :class="{ correct: result.isCorrect, incorrect: !result.isCorrect }">
        <h1>{{ result.question }}</h1>
        <strong>
          <p>Selected: {{ result.selectedAnswer }} ({{ result.isCorrect ? "Correct" : "Wrong" }})</p>
        </strong>
      </div>

      <button class="answer" @click="reloadGame">Reload Game</button>
    </div>
  </div>
</template>


<style scoped>
/* Global Styling */
  
.millionaire-container {
    width: 90%;
    max-width: 800px;
    text-align: center;
  }
  
  /* Header */
  .header h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  
  /* Question Area */
  .question-area {
    margin: 20px 0;
    padding: 10px;
    border: 3px solid #ffd700;
    border-radius: 20px;
    width: 730px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background: rgba(255, 215, 0, 0.2);
  }
  
  .question-box {
    font-size: 1.5rem;
    text-align: center;
  }
  
  /* Answer Options */
  .answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin: 20px 0;
  }
  
  .answer {
    background-color: #001f54;
    color: #fff;
    border: 2px solid #ffd700;
    padding: 15px;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .answer:hover {
    background-color: #ffd700;
    color: #000;
  }

  .answer:selected{
    background-color: rgb(30, 255, 0);
    color: aliceblue;
  }
</style>
