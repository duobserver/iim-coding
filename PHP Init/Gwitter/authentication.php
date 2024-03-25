<?php

require_once "database.php";

// login operation
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['form'] == 'login') {
    // if the server receives the correct request

    if ($_POST['username'] != '' && $_POST['password'] != '') {
        // if the login credentials are not empty

        $data = [
            'username' => $_POST['username'],
            'password' => $_POST['password']
        ];

        $query = $database->prepare("SELECT userId, userPassword FROM users WHERE userName=:username AND userPassword=:password");
        $query->execute($data);
        $response = $query->fetchAll(PDO::FETCH_ASSOC);

        if (count($response) == 1) {
            // if an account with these credentials exists
            session_start();

            $_SESSION['userId'] = $response[0]['userId'];
            $_SESSION['userPassword'] = $response[0]['userPassword'];

            header("location: authentication.php?response=1");
        } else {
            // if the user isn't recognized
            header("location: authentication.php?response=2");
        };
    };
};

// logout operation
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['form'] == 'logout') {
    session_start();

    // destroy session variables
    session_unset();

    // terminate session
    session_destroy();

    header("location: authentication.php?response=3");
};

// signup operation
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['form'] == 'signup') {
    $data = [
        'username' => $_POST['username'],
        'email' => $_POST['email'],
        'password' => $_POST['password']
    ];

    $query = $database->prepare("INSERT INTO users (userName, userEmail, userPassword) VALUES (:username, :email, :password)");

    // if the operation fails, a message will be shown
    if ($query->execute($data)) {
        echo $data['username'];
        $query = $database->prepare("SELECT userId FROM users WHERE userName = '" . $data['username'] . "'");
        $query->execute();
        $response = $query->fetchAll(PDO::FETCH_ASSOC);

        $userId = $response[0]['userId'];

        $query = $database->prepare("CREATE TABLE `" . $userId . "_follows` (`followId` INT NOT NULL COMMENT 'Following user identifier' , `followStatus` INT NOT NULL COMMENT 'Follow status (\r\n0: following id,\r\n1: followed by id,\r\n2: both)' ) ENGINE = InnoDB");
        $query->execute();

        $query = $database->prepare("CREATE TABLE `" . $userId . "_likes` (`likeId` INT NOT NULL COMMENT 'Liked gweet identifier ' ) ENGINE = InnoDB;");
        $query->execute();

        header("location: authentication.php?auth=login&response=4");
    } else {
        header("location: authentication.php?response=5");
    };
};

require_once "authentication.template.php";
