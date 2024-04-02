<?php

require_once "database.php";
session_start();

if (isset($_SESSION['userId'])) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['form'] == 'settings') {
        if ($_POST['userPassword'] == $_SESSION['userPassword']) {
            
            $data = [
                'userName' => $_POST['userName'],
                'userEmail' => $_POST['userEmail'],
                'newPassword' => $_SESSION['userPassword'],
                'userBio' => $_POST['userBio'],
                'userColor' => $_POST['userColor'],
            ];

            if ($_POST['newPassword'] != '') {
                $data['newPassword'] = $_POST['newPassword'];
                $_SESSION['userPassword'] = $_POST['newPassword'];
            };

            $query = $database->prepare('UPDATE users SET userName = :userName, userEmail = :userEmail, userPassword = :newPassword, userBio = :userBio, userColor = :userColor WHERE userId = '. $_SESSION['userId']);
            $query->execute($data);

            header("location: settings.php?response=Settings updated successfully");
        } else {
            header("location: settings.php?response=Could not update settings");
        };
    };

    $query = $database->prepare('SELECT userName, userEmail, userPassword, userBio, userColor FROM users WHERE userId = ' . $_SESSION['userId']);
    $query->execute();
    $settings = $query->fetchAll(PDO::FETCH_ASSOC);

    require_once "settings.template.php";
} else {
    header("Location: authentication.php?auth=login&response=Please log into an account to change its settings");
};
