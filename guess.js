// Timer and Game Logic
let timer = 0;
let attempts = 0;
let score = 1000;
let interval;

document.getElementById('easy').addEventListener('click', () => startGame(10));
document.getElementById('medium').addEventListener('click', () => startGame(50));
document.getElementById('hard').addEventListener('click', () => startGame(100));
document.getElementById('submit-guess').addEventListener('click', checkGuess);

const guessInput = document.getElementById('guess-input');

// Listen for the Enter key press on the input
guessInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Check if the pressed key is Enter
        event.preventDefault(); // Prevent the default form submission (if any)
        checkGuess(); // Call the checkGuess function
    }
});

let targetNumber;

function startGame(range) {
    targetNumber = Math.floor(Math.random() * range) + 1;
    resetGame();
    interval = setInterval(updateTimer, 1000);
    document.getElementById('feedback').textContent = `Game started! Guess a number between 1 and ${range}.`;
}

function resetGame() {
    clearInterval(interval);
    timer = 0;
    attempts = 0;
    score = 1000;
    updateUI();
}

function updateTimer() {
    timer++;
    document.getElementById('timer').textContent = `Timer: ${Math.floor(timer / 60)}:${timer % 60}`;
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guess-input').value, 10);
    attempts++;
    score -= 10;

    if (guess === targetNumber) {
        clearInterval(interval);
        document.getElementById('feedback').textContent = `🎉 Correct! You guessed it in ${attempts} attempts. Your score: ${score}`;
    } else if (guess > targetNumber) {
        document.getElementById('feedback').textContent = "Too high! Try again.";
    } else {
        document.getElementById('feedback').textContent = "Too low! Try again.";
    }

    updateUI();
}

function updateUI() {
    document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
    document.getElementById('score').textContent = `Score: ${score}`;
}