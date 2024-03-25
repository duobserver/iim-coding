<?php

require_once "database.php";

$query = $database->prepare('SELECT * FROM users WHERE userId = ' . $_GET['userId']);
$query->execute();
$profile = $query->fetchAll(PDO::FETCH_ASSOC);

$query = $database->prepare("SELECT * FROM " . $_GET['userId'] ."_follows WHERE followStatus IN (1, 2)");
$query->execute();
$followers = $query->fetchAll(PDO::FETCH_ASSOC);

$query = $database->prepare("SELECT * FROM " . $_GET['userId'] ."_follows WHERE followStatus IN (0, 2)");
$query->execute();
$following = $query->fetchAll(PDO::FETCH_ASSOC);

require_once "profile.template.php";
