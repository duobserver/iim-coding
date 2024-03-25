<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['form'] == 'gweet') {
    require_once "database.php";
    session_start();

    if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) {
        $data = [
            'authorId' => $_SESSION['userId'],
            'gweetContent' => $_POST['content']
        ];

        $query = $database->prepare("INSERT INTO gweets (authorId, gweetContent) VALUES (:authorId, :gweetContent)");
        $query->execute($data);

        header("location: home.php");
    };
};
