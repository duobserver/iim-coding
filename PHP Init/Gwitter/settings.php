<?php

require_once "database.php";
session_start();

if (isset($_SESSION['userId'])) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['form'] == 'settings') {
        if ($_POST['userPassword'] == $_SESSION['userPassword']) {
            $_SESSION['userPassword'] = $_POST['newPassword'];

            $data = [
                'userName' => $_POST['userName'],
                'userEmail' => $_POST['userEmail'],
                'newPassword' => $_POST['newPassword'],
                'userBio' => $_POST['userBio'],
                'userColor' => $_POST['userColor'],
            ];

            $query = $database->prepare('UPDATE users SET userName = :userName, userEmail = :userEmail, userPassword = :newPassword, userBio = :userBio, userColor = :userColor WHERE userId = '. $_SESSION['userId']);
            $query->execute($data);
            
            header("location: settings.php");
        } else {
            header("location: settings.php?response=1");
        };
    };

    $query = $database->prepare('SELECT userName, userEmail, userPassword, userBio, userColor FROM users WHERE userId = ' . $_SESSION['userId']);
    $query->execute();
    $settings = $query->fetchAll(PDO::FETCH_ASSOC);

    require_once "settings.template.php";
} else {
    header("Location: " . $_SERVER['HTTP_REFERER']);
};
