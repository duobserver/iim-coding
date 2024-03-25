<?php
// gwitter elements eraser
// only available for logged in users

require_once "../database.php";

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['form'] == 'delete') {
    if (isset($_SESSION['userId'])) {
        if ($_POST['mode'] == 'gweet') {
            // if a gweet has to be deleted
            // check gweet ownership (hacksafe)

            $query = $database->prepare('SELECT * FROM gweets WHERE gweetId = ' . $_POST['gweetId'] . ' AND gweetAuthor = ' . $_SESSION['userId']);
            $query->execute();
            $gweet = $query->fetchAll(PDO::FETCH_ASSOC);

            if (count($gweet) == 1) {
                // if gweet ownership is confirmed

                $query = $database->prepare('DELETE FROM gweets WHERE gweetId = ' . $_POST['gweetId']);
                $query->execute();
            };
        };
    };
};

header('location: ../home.php?read=feed');
