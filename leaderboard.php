<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "game_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM leaderboard ORDER BY total_score DESC";
$result = $conn->query($sql);

echo "<h1>Leaderboard</h1>";
if ($result->num_rows > 0) {
    echo "<table>";
    echo "<tr><th>Player</th><th>Score</th><th>Date</th></tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["player_name"]. "</td><td>" . $row["total_score"]. "</td><td>" . $row["game_date"]. "</td></tr>";
    }
    echo "</table>";
} else {
    echo "No records found.";
}

$conn->close();
?>
