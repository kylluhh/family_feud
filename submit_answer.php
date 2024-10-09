<?php
// Database configuration
$host = 'localhost';
$dbname = 'game_db';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

// Set up DSN (Data Source Name)
$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";

// PDO options
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Enable exceptions
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Fetch associative arrays by default
    PDO::ATTR_EMULATE_PREPARES   => false, // Disable emulated prepared statements
];

// Create a PDO instance (connect to database)
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // Handle database connection error
    die("Connection failed: " . $e->getMessage());
}

// Assuming you're receiving these POST values from your game frontend
$player = $_POST['player']; // player number (1 or 2)
$answer = $_POST['answer'];
$question_id = $_POST['question_id'];
$timestamp = date("Y-m-d H:i:s");

// Get player names from the game state (assuming these are sent with the answer)
$player1Name = $_POST['player1Name'];
$player2Name = $_POST['player2Name'];
$playerName = ($player === '1') ? $player1Name : $player2Name;

// SQL statement to insert answer into the database
$sql = "INSERT INTO answers (player_name, answer, question_id, timestamp) 
        VALUES (:playerName, :answer, :question_id, :timestamp)";

// Prepare and execute the SQL statement
$stmt = $pdo->prepare($sql);
$stmt->execute([
    'playerName' => $playerName,
    'answer' => $answer,
    'question_id' => $question_id,
    'timestamp' => $timestamp
]);

// Check if the insertion was successful
if ($stmt->rowCount() > 0) {
    echo "Answer recorded successfully";
} else {
    echo "Error recording answer";
}
