<!-- gwitter homepage for posts feed -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once "presets/reels.php" ?>
    <link rel="stylesheet" href="css/gweets.css">

    <title>Document</title>
</head>

<body>
    <!-- external php components -->
    <?php require_once "presets/components.php" ?>

    <main>
        <?php if (isset($_SESSION['userId'])) : // header ribbon manager 
        ?>
            <header id="ribbonHeader">
                <h2>Home</h2>
                <div>
                    <a href="home.php?read=feed" class="feed">Feed</a>
                    <a href="home.php?read=following" class="following">Following</a>
                </div>
            </header>

            <?php if ($_GET['read'] == 'following') : // if the user is only reading gweets from followed users 
            ?>
                <?php $gweets = gweetFetch('following', 0); ?>
                <?php require_once "gweetShow.php" ?>

            <?php else : // if the user is reading all gweets 
            ?>
                <?php $gweets = gweetFetch('all', 0); ?>
                <?php require_once "gweetShow.php" ?>

            <?php endif; ?>

        <?php else : // if no one is connected 
        ?>
            <header id="ribbonHeader">
                <h2>Feed</h2>
            </header>

            <?php $gweets = gweetFetch('all', 0); ?>
            <?php require_once "gweetShow.php" ?>

        <?php endif; ?>
    </main>

    <script src="javascript/read.js"></script>
    <script src="javascript/gweetPost.js"></script>
</body>

</html>