const bird = document.getElementById('bird');
const gameArea = document.getElementById('gameArea');
let level = 1;
let position = 0; // Starting position of the bird

// List of questions for each level
const questions = [
    { 
        question: "What is the capital of the United States?", 
        answer: "Washington D.C."
    },
    { 
        question: "What is 5 + 7?", 
        answer: "12"
    },
    { 
        question: "Which planet is closest to the sun?", 
        answer: "Mercury"
    }
];

// Start the game
function startGame() {
    moveBird();
}

// Move the bird across the screen
function moveBird() {
    const moveInterval = setInterval(() => {
        position += 10; // Bird moves forward
        bird.style.left = position + 'px';

        // When bird reaches the end of the game area (80%)
        if (position >= (gameArea.clientWidth * 0.8)) {
            clearInterval(moveInterval); // Stop the bird
            askQuestion();
        }
    }, 100); // Move every 100ms
}

// Pop up a question for the player
function askQuestion() {
    const currentQuestion = questions[level - 1];
    const userAnswer = prompt(currentQuestion.question);
    
    // Check if answer is correct
    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
        alert("Correct! Moving to the next level.");
        nextLevel();
    } else {
        alert("Wrong answer! Try again.");
        retryLevel();
    }
}

// Move to the next level
function nextLevel() {
    if (level < questions.length) {
        level++;
        position = 0; // Reset bird position
        bird.style.left = position + 'px'; // Move bird back to start
        startGame(); // Start the next level
    } else {
        alert("Congratulations! You've completed the game!");
    }
}

// Retry the current level if the player gets the answer wrong
function retryLevel() {
    position = 0; // Reset bird position
    bird.style.left = position + 'px'; // Move bird back to start
    startGame(); // Retry the level
}

// Start the game when the page loads
window.onload = startGame;
