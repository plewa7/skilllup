<?php
$host = 'db'; // nazwa serwisu z docker-compose.yml
$user = 'root';
$pass = 'root';
$dbname = 'todo_app';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Create notes table if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if (!$conn->query($sql)) {
    die('Error creating table: ' . $conn->error);
}
?>
