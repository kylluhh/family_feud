let playerScores = {
    teamA: 0,
    teamB: 0,
};
let currentRound = 0;
let totalRounds = 5; // Number of rounds
let countdownTimer;
let answerTimer;

document.getElementById('start-game').addEventListener('click', startGame);

function startGame() {
    // Reset scores
    playerScores.teamA = 0;
    playerScores.teamB = 0;
    currentRound = 0;
    updateScoreTable();
    document.getElementById('results').innerHTML = "";
    startCountdown();
}

function startCountdown() {
    let countdownValue = 3;
    document.getElementById('countdown-timer').classList.remove('hidden');
    document.getElementById('countdown-timer').innerText = countdownValue;
    
    countdownTimer = setInterval(() => {
        countdownValue--;
        if (countdownValue <= 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown-timer').classList.add('hidden');
            startAnswerTimer();
        } else {
            document.getElementById('countdown-timer').innerText = countdownValue;
        }
    }, 1000);
}

function startAnswerTimer() {
    let timeLeft = 100; // 100 seconds
    answerTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('answer-timer').value = 100 - timeLeft;
        if (timeLeft <= 0) {
            clearInterval(answerTimer);
            alert("Time's up!");
            endRound();
        }
    }, 1000);
}

document.getElementById('answer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let answer = document.getElementById('user-answer').value;
    validateAnswer(answer);
});

function validateAnswer(answer) {
    // Assume we have predefined correct answers
    let correctAnswers = ["Dog", "Cat", "Frog"];
    if (correctAnswers.includes(answer)) {
        alert("Correct answer!");
        // Update scores and results display
    } else {
        alert("Incorrect answer!");
    }
    document.getElementById('user-answer').value = '';
}

function updateScoreTable() {
    document.getElementById('score-table-body').innerHTML = `
        <tr>
            <td>Team A</td>
            <td>${playerScores.teamA}</td>
        </tr>
        <tr>
            <td>Team B</td>
            <td>${playerScores.teamB}</td>
        </tr>
    `;
}

function endRound() {
    // Logic to end the round and update scores
}
