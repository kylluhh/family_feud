let playerTurn = 0; // Track which player is answering
let player1Score = 0;
let player2Score = 0;
let currentQuestionIndex = 0;
let timer;
let timerDuration = 15;

const questions = [
    { question: "Name a fruit that is red.", answers: { apple: 50, strawberry: 30, cherry: 20 } },
    { question: "Name a pet you might have at home.", answers: { dog: 40, cat: 30, fish: 20 } },
    { question: "Name something that gets wetter the more it dries.", answers: { towel: 60 } },
    { question: "Name a type of transportation.", answers: { car: 50, bus: 30, bike: 20 } },
    { question: "Name something that flies.", answers: { bird: 50, airplane: 40, kite: 20 } }
];

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('buzzer').addEventListener('click', showPopup);
document.getElementById('player1Answer').addEventListener('click', () => choosePlayer(1));
document.getElementById('player2Answer').addEventListener('click', () => choosePlayer(2));
document.getElementById('submitAnswer').addEventListener('click', checkAnswer);

function startGame() {
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;

    if (player1Name && player2Name) {
        document.getElementById('player1Score').innerText = `${player1Name}: 0`;
        document.getElementById('player2Score').innerText = `${player2Name}: 0`;
        showQuestion();
        document.querySelector('.answer-section').style.display = 'none';
    } else {
        alert("Please enter names for both players.");
    }
}

function showQuestion() {
    document.getElementById('question').innerText = questions[currentQuestionIndex].question;
}

function startTimer() {
    let time = timerDuration;
    document.getElementById('timer').style.display = 'block';
    document.getElementById('timer').innerText = `Time left: ${time} seconds`;

    timer = setInterval(() => {
        time--;
        document.getElementById('timer').innerText = `Time left: ${time} seconds`;
        if (time <= 0) {
            clearInterval(timer);
            alert('Time is up!');
            nextQuestion();
        }
    }, 1000);
}

function showPopup() {
    document.getElementById('answerPopup').style.display = 'block';
    startTimer(); // Start the timer when buzzer is clicked
}

function choosePlayer(player) {
    playerTurn = player;
    document.getElementById('answerPopup').style.display = 'none';
    document.querySelector('.answer-section').style.display = 'block'; // Show answer input and button
}

function checkAnswer() {
    const answer = document.getElementById('answer').value.toLowerCase();
    const correctAnswers = questions[currentQuestionIndex].answers;

    if (correctAnswers[answer]) {
        if (playerTurn === 1) {
            player1Score += correctAnswers[answer];
            document.getElementById('player1Score').innerText = `${document.getElementById('player1').value}: ${player1Score}`;
        } else if (playerTurn === 2) {
            player2Score += correctAnswers[answer];
            document.getElementById('player2Score').innerText = `${document.getElementById('player2').value}: ${player2Score}`;
        }

        // Record the answer in the database with timestamp
        recordAnswer(playerTurn, answer);
    }

    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        endGame();
    } else {
        showQuestion();
        document.getElementById('answer').value = ''; // Clear the answer field for the next question
        document.querySelector('.answer-section').style.display = 'none'; // Hide answer input until buzzer is clicked
    }
}

function endGame() {
    clearInterval(timer);
    alert('Game Over!');
    // Optionally, you could redirect to the leaderboard or reset the game
}

// AJAX call to submit the answer to the server
function recordAnswer(player, answer) {
    const question_id = currentQuestionIndex + 1; // assuming question_id is based on index
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'submit_answer.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Answer submitted successfully');
        } else {
            console.error('Error submitting answer');
        }
    };
    xhr.send(`player=${player}&answer=${answer}&question_id=${question_id}&player1Name=${player1Name}&player2Name=${player2Name}`);
}
