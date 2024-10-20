const stages = [
    {
        image: 'url("https://live.staticflickr.com/7215/6973406508_ae9415cb69_c.jpg")',
        message: "Stage 1: Select the chassis!",
        popupImage: "https://live.staticflickr.com/7215/6973406508_ae9415cb69_c.jpg",
        correctOption: "Chassis",
        options: ["Chassis", "Engine", "Color"],
        riddle: { question: "Have four wheels and go vroom, but I can’t move on my own. What am I??", answer: "A parked car" }
    },
    {
        image: 'url("https://cars.bonhams.com/_next/image.jpg?url=https%3A%2F%2Fimg1.bonhams.com%2Fimage%3Fsrc%3DImages%2Flive%2F2017-08%2F17%2F24678182-1-5.jpeg&w=2400&q=75")',
        message: "Stage 2: Choose the engine!",
        popupImage: "https://cars.bonhams.com/_next/image.jpg?url=https%3A%2F%2Fimg1.bonhams.com%2Fimage%3Fsrc%3DImages%2Flive%2F2017-08%2F17%2F24678182-1-5.jpeg&w=2400&q=75",
        correctOption: "Engine",
        options: ["Chassis", "Engine", "Color"],
        riddle: { question: "What do you call a vehicle that always thinks it’s right??", answer: "A car" }
    },
    {
        image: 'url("https://3dwarehouse.sketchup.com/warehouse/v1.0/content/public/90116243-f259-4c19-a409-42d14c95dda8")',
        message: "Stage 3: Pick the body style!",
        popupImage: "https://3dwarehouse.sketchup.com/warehouse/v1.0/content/public/90116243-f259-4c19-a409-42d14c95dda8",
        correctOption: "Body Style",
        options: ["Chassis", "Body Style", "Color"],
        riddle: { question: "I have a key but open no locks. What am I??", answer: "A car ignition" }
    },
    {
        image: 'url("https://i.pinimg.com/736x/fa/d8/6f/fad86f9cd4b454ab87341859e914c930.jpg")',
        message: "Stage 4: Choose your color!",
        popupImage: "https://i.pinimg.com/736x/fa/d8/6f/fad86f9cd4b454ab87341859e914c930.jpg",
        correctOption: "Black",
        options: ["Red", "Blue", "Green", "Black"],
        riddle: { question: "I can be long or short, but I always have a path. What am I??", answer: "A Road" }
    }
];

let currentStage = 0;

const stageElement = document.getElementById('stage');
const messageElement = document.getElementById('message');
const optionsElement = document.getElementById('options');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const caption = document.getElementById('caption');
const welcomeScreen = document.getElementById('welcomeScreen');
const gameScreen = document.getElementById('gameScreen');
const enterGameButton = document.getElementById('enterGame');
const riddleModal = document.getElementById('riddleModal');
const riddleText = document.getElementById('riddleText');
const riddleAnswer = document.getElementById('riddleAnswer');
const closeRiddleModal = document.getElementById('closeRiddleModal');
const submitRiddle = document.getElementById('submitRiddle');
const nextStageButton = document.getElementById('nextStage');
const restartGameButton = document.getElementById('restartGame');

enterGameButton.onclick = () => {
    welcomeScreen.style.display = "none";
    gameScreen.style.display = "block";
    loadStage();
};

const loadStage = () => {
    const stage = stages[currentStage];
    stageElement.style.backgroundImage = stage.image;
    messageElement.innerText = stage.message;
    optionsElement.innerHTML = '';

    stage.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-button');
        button.onclick = () => handleOptionClick(option);
        optionsElement.appendChild(button);
    });
};

const handleOptionClick = (option) => {
    if (option === stages[currentStage].correctOption) {
        messageElement.innerText = "Correct! Now solve the riddle.";
        openRiddleModal();
    } else if (currentStage === 3 && option !== "Black") {
        messageElement.innerText = "Wrong color! Please choose Black.";
    } else {
        messageElement.innerText = "Wrong! Try again.";
    }
};

const openRiddleModal = () => {
    riddleText.innerText = stages[currentStage].riddle.question;
    riddleModal.style.display = "block";
    riddleAnswer.value = ''; // Clear previous answer
};

closeRiddleModal.onclick = () => {
    riddleModal.style.display = "none";
};

submitRiddle.onclick = () => {
    if (riddleAnswer.value.toLowerCase() === stages[currentStage].riddle.answer.toLowerCase()) {
        messageElement.innerText = "Riddle solved! Here's the image.";
        openImageModal();
        riddleModal.style.display = "none";
    } else {
        messageElement.innerText = "Incorrect answer. Try again.";
    }
};

const openImageModal = () => {
    modalImage.src = stages[currentStage].popupImage; // Load the correct image
    caption.innerText = "Stage " + (currentStage + 1);
    modal.style.display = "block";
    nextStageButton.style.display = "block"; // Show the next stage button
};

closeModal.onclick = () => {
    modal.style.display = "none";
    nextStageButton.style.display = "none"; // Hide the next stage button
    currentStage++;
    if (currentStage < stages.length) {
        loadStage();
    } else {
        endGame();
    }
};

const endGame = () => {
    messageElement.innerText = "Congratulations! You've built your Ford Mustang!";
    optionsElement.innerHTML = '';
    const finalImage = "https://th.bing.com/th/id/OIP.TRQNUKAIJwP9V9YPzGkHmAHaEK?w=325&h=183&c=7&r=0&o=5&dpr=1.8&pid=1.7"; // Example image
    modalImage.src = finalImage;
    caption.innerText = "1946 Ford Mustang";
    modal.style.display = "block";
    nextStageButton.style.display = "none"; // Hide the next stage button for final image
    restartGameButton.style.display = "block"; // Show the restart game button
};

nextStageButton.onclick = () => {
    modal.style.display = "none";
    nextStageButton.style.display = "none"; // Hide the next stage button
    currentStage++;
    if (currentStage < stages.length) {
        loadStage();
    } else {
        endGame();
    }
};

restartGameButton.onclick = () => {
    currentStage = 0;
    messageElement.innerText = '';
    optionsElement.innerHTML = '';
    restartGameButton.style.display = "none"; // Hide the restart button
    welcomeScreen.style.display = "block"; // Show welcome screen again
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
