<?php
// user following interaction
// only available for logged in users

require_once "../database.php";

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['form'] == 'follow') {
    if (isset($_SESSION['userId'])) {
        // if an user is logged in
        // save active user id and target user id

        $userId = $_SESSION['userId'];
        $followId = $_POST['followId'];

        $query = $database->prepare('SELECT * FROM ' . $userId . '_follows WHERE followId = ' . $followId);
        $query->execute();
        $following = $query->fetchAll(PDO::FETCH_ASSOC);

        if (count($following) > 0) {
            // if this user is linked to the targeted user (following/followed/both)

            if ($following[0]['followStatus'] == 0) {
                // if this user is following the target but is not followed by the target

                $query = $database->prepare('DELETE FROM ' . $userId . '_follows WHERE followId = ' . $followId);
                $query->execute();
                $query = $database->prepare('DELETE FROM ' . $followId . '_follows WHERE followId = ' . $userId);
                $query->execute();
            } elseif ($following[0]['followStatus'] == 1) {
                // if this user is not following the target but is followed by the target

                $query = $database->prepare('UPDATE ' . $userId . '_follows SET followStatus = 2 WHERE followId = ' . $followId);
                $query->execute();
                $query = $database->prepare('UPDATE ' . $followId . '_follows SET followStatus = 2 WHERE followId = ' . $userId);
                $query->execute();
            } elseif ($following[0]['followStatus'] == 2) {
                // if this user is following the target and is followed by the target

                $query = $database->prepare('UPDATE ' . $userId . '_follows SET followStatus = 1 WHERE followId = ' . $followId);
                $query->execute();
                $query = $database->prepare('UPDATE ' . $followId . '_follows SET followStatus = 0 WHERE followId = ' . $userId);
                $query->execute();
            };
        } else {
            // if this user is not linked to the targeted user

            $query = $database->prepare('INSERT INTO ' . $userId . '_follows (followId, followStatus) VALUES (' . $followId . ', 0)');
            $query->execute();
            $query = $database->prepare('INSERT INTO ' . $followId . '_follows (followId, followStatus) VALUES (' . $userId . ', 1)');
            $query->execute();
        };
    };
};

header("Location: {$_SERVER['HTTP_REFERER']}");
