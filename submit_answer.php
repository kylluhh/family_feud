<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "game_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$player = $_POST['player']; // player number (1 or 2)
$answer = $_POST['answer'];
$question_id = $_POST['question_id'];
$timestamp = date("Y-m-d H:i:s");

// Get player names from the game state (assume these values are sent with the answer)
$player1Name = $_POST['player1Name'];
$player2Name = $_POST['player2Name'];
$playerName = ($player === '1') ? $player1Name : $player2Name;

$sql = "INSERT INTO answers (player_name, answer, question_id, timestamp) VALUES ('$playerName', '$answer', '$question_id', '$timestamp')";

if ($conn->query($sql) === TRUE) {
    echo "Answer recorded successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
