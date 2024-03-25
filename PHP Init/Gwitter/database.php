<?php
// database connection for gwitter

try {
    $database = new PDO('mysql:host=localhost;dbname=gwitter', 'root', '0x1b4dC0d3');
} catch (PDOException $e) {
    die('This website is currently unavailabale');
}

$query = $database->prepare('SELECT * FROM users');
$query->execute();
$users = $query->fetchAll(PDO::FETCH_ASSOC);
