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
        <?php if (isset($_GET['read']) && $_GET['read'] == 'following') : ?>
            <header id="ribbonHeader">
                <h2>Home</h2>
                <div>
                    <a href="home.php?read=feed" class="feed">Feed</a>
                    <a href="home.php?read=following" class="following">Following</a>
                </div>
            </header>

            <!-- if the user is only reading gweets from followed users -->
            <?php $gweets = gweetFetch('following', 0); ?>
            <?php require_once "gweetShow.php" ?>

        <?php elseif(isset($_GET['read'])) : ?>
            <header id="ribbonHeader">
                <h2>Home</h2>
                <div>
                    <a href="home.php?read=feed" class="feed">Feed</a>
                    <a href="home.php?read=following" class="following">Following</a>
                </div>
            </header>

            <!-- if the user is only reading gweets from followed users -->
            <?php $gweets = gweetFetch('all', 0); ?>
            <?php require_once "gweetShow.php" ?>

        <?php else : ?>
            <header id="ribbonHeader">
                <h2>Feed</h2>
            </header>

            <?php $gweets = gweetFetch('all', 0); ?>
            <?php require_once "gweetShow.php" ?>

        <?php endif; ?>
    </main>

    <?php require_once "aside.template.php" ?>

    <script src="read.js"></script>
</body>

</html>