<?php
session_start();
$servername = "localhost";
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "family_feud_name"; // Replace with your database name

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $playerName = mysqli_real_escape_string($conn, $_POST['player_name']);
    $score = $_POST['score'];
    
    // Insert player name and score
    $sql = "INSERT INTO scores (player_name, score, game_date) VALUES ('$playerName', $score, NOW())";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

// Retrieve scores
$sql = "SELECT player_name, score FROM scores ORDER BY score DESC";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        echo "Player: " . $row["player_name"].
