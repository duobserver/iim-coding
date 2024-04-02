<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['form'] == 'gweetPost') {
    require_once "database.php";
    session_start();

    if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) {
        $data = [
            'gweetAuthor' => $_SESSION['userId'],
            'gweetContent' => $_POST['content']
        ];

        $query = $database->prepare("INSERT INTO gweets (gweetAuthor, gweetContent) VALUES (:gweetAuthor, :gweetContent)");
        $query->execute($data);
    };
};

header("Location: {$_SERVER['HTTP_REFERER']}");
