<!-- gwitter profile page for user info -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once "presets/reels.php" ?>
    <link rel="stylesheet" href="css/gweets.css">
    <link rel="stylesheet" href="css/profile.css">

    <title>Document</title>
</head>

<body>
    <!-- external php components -->
    <?php require_once "presets/components.php"; ?>

    <main>
        <header id="profileHeader">
            <!-- top header for profile -->
            <div id="profileTitle">
                <span class="material-symbols-rounded profilePfp" style="color: <?php echo $profile[0]['userColor']; ?>;">
                    account_circle
                </span>

                <?php
                $query = $database->prepare('SELECT userName FROM users WHERE userId = ' . $_GET['userId']);
                $query->execute();
                $user = $query->fetchAll(PDO::FETCH_ASSOC);

                echo "<h2 style='color: " . $profile[0]['userColor'] . ";'>" . $user[0]['userName'] . "</h2>";
                ?>
            </div>

            <!-- profile interaction manager -->
            <?php if (isset($_SESSION)) : // if an user is connected 
            ?>

                <?php if ($_SESSION['userId'] == $_GET['userId']) : // if the viewed profile is the user's profile 
                ?>

                    <a href='settings.php?userId="<?php echo $_SESSION['userId']; ?>"' class="settingsButton">Settings</a>

                <?php else : // if the viewed profile is someone else's profile 
                ?>
                    <?php
                    $query = $database->prepare('SELECT * FROM ' . $_SESSION['userId'] . '_follows WHERE followId = ' . $_GET['userId']);
                    $query->execute();
                    $followed = $query->fetchAll(PDO::FETCH_ASSOC);


                    if (count($followed) > 0 && ($followed[0]['followStatus'] == 0 || $followed[0]['followStatus'] == 2)) : // if this user is following the profile owner 
                    ?>

                        <form action="interactions/follow.php" method="POST">
                            <input type="hidden" name="form" value="follow">
                            <input type="hidden" name="followId" value=<?php echo $_GET['userId'] ?>>
                            <button type="submit" class="followButton following" title="Unfollow this user">
                                Following
                            </button>
                        </form>

                    <?php else : // if this user is not following the profile owner 
                    ?>
                        <form action="interactions/follow.php" method="POST">
                            <input type="hidden" name="form" value="follow">
                            <input type="hidden" name="followId" value=<?php echo $_GET['userId'] ?>>
                            <button type="submit" class="followButton" title="Follow this user">
                                Follow
                            </button>
                        </form>
                    <?php endif; ?>
                <?php endif; ?>
            <?php endif; ?>
        </header>

        <header id="infoHeader">
            <p id="userBio"><?php echo $profile[0]['userBio']; ?></p>
            <p id="userJoined"><span class="material-symbols-rounded">
                    calendar_month
                </span>
                Joined on <?php echo $profile[0]['userJoined']; ?>
            </p>
            <p id="userFollows"><?php echo count($followers); ?><span class="detail"> Follower(s) &#8226; </span><?php echo count($following); ?><span class="detail"> Following</span></p>
        </header>

        <header id="ribbonHeader">
            <div>
                <?php

                echo "<a href='?userId=" . $_GET['userId'] . "&read=author' class='author'>Gweets</a>";
                echo "<a href='?userId=" . $_GET['userId'] . "&read=followers&people' class='followers'>Followers</a>";
                echo "<a href='?userId=" . $_GET['userId'] . "&read=followingu&people' class='following'>Following</a>";
                echo "<a href='?userId=" . $_GET['userId'] . "&read=likes' class='likes'>Likes</a>";

                ?>
            </div>
        </header>
        
        <article class="gweets">
            <?php $gweets = gweetFetch($_GET['read'], $_GET['userId']); ?>
            <?php require_once "gweetShow.php" ?>
        </article>
    </main>

    <?php require_once "aside.template.php" ?>

    <script src="read.js"></script>
    <script src="top.js"></script>
</body>

</html>