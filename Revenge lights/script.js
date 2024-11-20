const boardSize = 4; // 4x4 grid
const board = [];

// Initialize board
function initBoard() {
    const gameBoard = document.getElementById("game-board");
    for (let i = 0; i < boardSize * boardSize; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.addEventListener("click", () => toggleSquare(i));
        board.push(square);
        gameBoard.appendChild(square);
    }
    randomizeBoard();
}

// Toggle square color
function toggleSquare(index) {
    const square = board[index];
    square.classList.toggle("is-off");
    checkWinCondition();
}

// Simulate random clicks for solvable setup
function randomizeBoard() {
    const numClicks = Math.floor(Math.random() * 20) + 10;
    for (let i = 0; i < numClicks; i++) {
        const randomIndex = Math.floor(Math.random() * board.length);
        toggleSquare(randomIndex);
    }
}

// Check win condition
function checkWinCondition() {
    const allBlack = board.every(square => square.classList.contains("is-off"));
    if (allBlack) {
        window.alert("You win!");
    }
}

// Restart game function
function restartGame() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // Clear existing board
    board.length = 0; // Clear board array
    initBoard(); // Reinitialize board
}

// Attach restart button functionality
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", restartGame);

// Initialize the game on page load
window.onload = initBoard;
