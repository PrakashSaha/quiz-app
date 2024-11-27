<template>
    <div class="millionaire-container">
    <!-- Header -->
    <header class="header">
      <h1>Quiz application</h1>
    </header>

    <!-- Question Area -->
    <div class="question-area">
      <div class="question-box">
        <p class="question-text">What is the capital of France?</p>
      </div>
    </div>

    <!-- Answer Options -->
    <div class="answers">
      <button class="answer">A. Paris</button>
      <button class="answer">B. London</button>
      <button class="answer">C. Rome</button>
      <button class="answer">D. Berlin</button>
    </div>
  </div>
</template>

<script>
    export default {
        
    }
</script>

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
    padding: 15px;
    border: 3px solid #ffd700;
    border-radius: 20px;
    width: 757px;
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

  
</style>