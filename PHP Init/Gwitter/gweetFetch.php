<?php

require_once "database.php";

// echo 'running';

function gweetFetch($mode, $author)
// return required gweets/posts
{
    // connect to database
    try {
        $database = new PDO('mysql:host=localhost;dbname=gwitter', 'root', '0x1b4dC0d3');
    } catch (PDOException $e) {
        die('This website is currently unavailabale');
    }

    // echo 'fetching';

    if ($mode == 'all') {
        // if all the gweets are needed

        if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) {
            // if an user is connected
            // fetch all gweets and mark liked ones or followed users

            $query = $database->prepare("
            SELECT gweetId, gweetContent, userId, userName, userColor, gweetDate, TIMESTAMPDIFF(SECOND, gweetDate, NOW()) AS gweetAge, 
            CASE WHEN " . $_SESSION['userId'] . "_likes.likeId IS NULL THEN 'FALSE' ELSE 'TRUE' END AS liked, 
            CASE WHEN " . $_SESSION['userId'] . "_follows.followStatus IN (0, 2) THEN 'TRUE' ELSE 'FALSE' END AS following 
            FROM gweets 
            INNER JOIN users ON gweets.gweetAuthor = users.userId 
            LEFT JOIN " . $_SESSION['userId'] . "_likes ON gweets.gweetId = " . $_SESSION['userId'] . "_likes.likeId 
            LEFT JOIN " . $_SESSION['userId'] . "_follows ON users.userId = " . $_SESSION['userId'] . "_follows.followId 
            ORDER BY gweets.gweetId DESC");
            $query->execute();
            $gweets = $query->fetchAll(PDO::FETCH_ASSOC);
            return ageRedux($gweets);

        } else {
            // if no one is connected (guest)
            // fetch all gweets from recent to old

            $query = $database->prepare('SELECT gweetId, gweetContent, userId, userName, userColor, gweetDate, TIMESTAMPDIFF(SECOND, gweetDate, NOW()) AS gweetAge FROM gweets INNER JOIN users ON gweets.gweetAuthor = users.userId ORDER BY gweets.gweetId DESC
            ');
            $query->execute();
            $gweets = $query->fetchAll(PDO::FETCH_ASSOC);
            return ageRedux($gweets);
        };

    } elseif ($mode == 'following') {
        // show all gweets from followed users

        if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) {
            // if an user is connected
            // fetch all gweets from followed users and mark liked ones or followed users

            $query = $database->prepare("
            SELECT gweetId, gweetContent, userId, userName, userColor, gweetDate, TIMESTAMPDIFF(SECOND, gweetDate, NOW()) AS gweetAge, 
            CASE WHEN " . $_SESSION['userId'] . "_likes.likeId IS NULL THEN 'FALSE' ELSE 'TRUE' END AS liked, 
            CASE WHEN " . $_SESSION['userId'] . "_follows.followStatus IN (0, 2) THEN 'TRUE' ELSE 'FALSE' END AS following 
            FROM gweets 
            INNER JOIN users ON gweets.gweetAuthor = users.userId 
            LEFT JOIN " . $_SESSION['userId'] . "_likes ON gweets.gweetId = " . $_SESSION['userId'] . "_likes.likeId 
            INNER JOIN " . $_SESSION['userId'] . "_follows ON users.userId = " . $_SESSION['userId'] . "_follows.followId 
            WHERE " . $_SESSION['userId'] . "_follows.followStatus IN (0, 2) 
            ORDER BY gweets.gweetId DESC");
            $query->execute();
            $gweets = $query->fetchAll(PDO::FETCH_ASSOC);
            return ageRedux($gweets);
        };

    } elseif ($mode == 'author') {
        // show all gweets from specific user

        if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) {
            // if an user is connected
            // fetch all gweets from specific user and mark liked ones or followed users

            $query = $database->prepare("
            SELECT gweetId, gweetContent, userId, userName, userColor, gweetDate, TIMESTAMPDIFF(SECOND, gweetDate, NOW()) AS gweetAge, 
            CASE WHEN " . $_SESSION['userId'] . "_likes.likeId IS NULL THEN 'FALSE' ELSE 'TRUE' END AS liked 
            FROM gweets 
            INNER JOIN users ON gweets.gweetAuthor = users.userId 
            LEFT JOIN " . $_SESSION['userId'] . "_likes ON gweets.gweetId = " . $_SESSION['userId'] . "_likes.likeId 
            WHERE gweets.gweetAuthor = " . $author . " 
            ORDER BY gweets.gweetId DESC");
            $query->execute();
            $gweets = $query->fetchAll(PDO::FETCH_ASSOC);
            return ageRedux($gweets);
        };

    } elseif ($mode == 'likes') {
        // show all likes gweets from specific user

        if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) {
            // if an user is connected
            // fetch all liked gweets from specific user and mark gweets that are liked by connected user
            $query = $database->prepare("
            SELECT gweetId, gweetContent, userId, userName, userColor, gweetDate, TIMESTAMPDIFF(SECOND, gweetDate, NOW()) AS gweetAge,
            CASE WHEN a.likeId IS NULL THEN 'FALSE' ELSE 'TRUE' END AS liked 
            FROM gweets 
            INNER JOIN users ON gweets.gweetAuthor = users.userId 
            LEFT JOIN " . $_SESSION['userId'] . "_likes a ON gweets.gweetId = a.likeId 
            INNER JOIN " . $author . "_likes b ON gweets.gweetId = b.likeId 
            WHERE gweets.gweetId = b.likeId 
            ORDER BY gweets.gweetId DESC");
            $query->execute();
            $gweets = $query->fetchAll(PDO::FETCH_ASSOC);
            return ageRedux($gweets);
        };

    } elseif ($mode == 'followers') {
        // show all followers of a specific user

        $query = $database->prepare("
            SELECT userId, userName, userColor 
            FROM users
            INNER JOIN " . $author. "_follows ON " . $author. "_follows.followId = users.userId 
            WHERE " . $author. "_follows.followStatus IN (1, 2)");
        $query->execute();
        $gweets = $query->fetchAll(PDO::FETCH_ASSOC);
        return $gweets;

    } elseif ($mode == 'followingu') {
        // show all users followed by connected user

        $query = $database->prepare("
            SELECT userId, userName, userColor 
            FROM users
            INNER JOIN " . $author. "_follows ON " . $author. "_follows.followId = users.userId 
            WHERE " . $author. "_follows.followStatus IN (0, 2)");
        $query->execute();
        $gweets = $query->fetchAll(PDO::FETCH_ASSOC);
        return $gweets;
    };
};


function ageRedux($gweets)
// reduce gweetAge to human-friendly value
{
    foreach ($gweets as $key => $gweet) {
        $seconds = $gweet['gweetAge'];
        // echo $seconds;
        if ($seconds >= 3600 * 24 * 365) {
            // if the gweet has been posted more than a year ago
            $gweets[$key]['gweetAge'] = strval(floor($seconds / (3600 * 24 * 365))) . ' y';
        } elseif ($seconds >= 3600 * 24 * 30) {
            // if the gweet has been posted more than a month ago
            $gweets[$key]['gweetAge'] = strval(floor($seconds / (3600 * 24 * 30))) . ' mo';
        } elseif ($seconds >= 3600 * 24 * 7) {
            // if the gweet has been posted more than a week ago
            $gweets[$key]['gweetAge'] = strval(floor($seconds / (3600 * 24 * 7))) . ' w';
        } elseif ($seconds >= 3600 * 24) {
            // if the gweet has been posted more than a day ago
            $gweets[$key]['gweetAge'] = strval(floor($seconds / (3600 * 24))) . ' d';
        } elseif ($seconds >= 3600) {
            // if the gweet has been posted more than an hour ago
            $gweets[$key]['gweetAge'] = strval(floor($seconds / 3600)) . ' h';
        } elseif ($seconds >= 60) {
            // if the gweet has been posted more than a minute ago
            $gweets[$key]['gweetAge'] = strval(floor($seconds / 60)) . ' mi';
        } else {
            // if the gweet has been posted more than a second ago
            $gweets[$key]['gweetAge'] = strval($seconds) . ' s';
        }
    };
    return $gweets;
};
