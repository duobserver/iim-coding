<?php

require_once "../database.php";
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['form'] == 'like') {

    if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) {

        $data = [
            'likeId' => $_POST['likeId']
        ];

        $query = $database->prepare('SELECT * FROM ' . $_SESSION['userId'] . '_likes WHERE likeId = :likeId');
        $query->execute($data);
        $response = $query->fetchAll(PDO::FETCH_ASSOC);


        if (count($response) == 1) {
            // if the gweet in question is already liked
            // remove gweet from table (dislike)

            $query = $database->prepare('DELETE FROM ' . $_SESSION['userId'] . '_likes WHERE likeId = :likeId');
            $query->execute($data);
        } else {
            // if the gweet isn't liked
            // add gweet to table (like)

            $query = $database->prepare('INSERT INTO ' . $_SESSION['userId'] . '_likes (likeId) VALUES (:likeId)');
            $query->execute($data);
        };
    };
};

header("Location: {$_SERVER['HTTP_REFERER']}");
