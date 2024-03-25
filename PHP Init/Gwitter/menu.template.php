<?php session_start(); ?>
<?php require_once "database.php" ?>

<nav id="sidebar">
    <header>
        <h2>Gwitter</h2>
    </header>

    <?php if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) : ?>
        <!-- if an user is connected -->

        <div id="navLinks">
            <a href="home.php?read=feed" id="home" class="navLink" title="Read the most recent gweets">
                <span class="material-symbols-rounded">home</span>Home
            </a>

            <a href="profile.php?userId=<?php echo $_SESSION['userId']; ?>&read=author" id="profile" class="navLink" title="View your public profile">
                <span class="material-symbols-rounded">account_circle</span>Profile
            </a>

            <a href="settings.php?userId=<?php echo $_SESSION['userId']; ?>" id="settings" class="navLink" title="Change your account settings">
                <span class="material-symbols-rounded">settings</span>Settings
            </a>

            <a href="logout.php" id="logout" class="navLink" title="Log out of your accout">
                <span class="material-symbols-rounded">logout</span>Logout
            </a>

            <a href="" id="gweet" class="navLink" title="Post a new gweet">
                <span class="material-symbols-rounded">send</span>Gweet
            </a>
        </div>

    <?php else : ?>
        <!-- if no one is connected -->

        <div id="navLinks">
            <a href="home.php?read=feed" id="home" class="navLink" title="Read the most recent gweets">
                <span class="material-symbols-rounded">home</span>Home
            </a>

            </a>

            <a href="logout.php" id="logout" class="navLink" title="Log out of your accout">
                <span class="material-symbols-rounded">logout</span>Logout
            </a>

            <a href="" id="gweet" class="navLink" title="Post a new gweet">
                <span class="material-symbols-rounded">send</span>Gweet
            </a>
        </div>

        <ul>
            <li id="home" title="Read the most recent gweets">
                <span class="material-symbols-rounded">home </span><a href="home.php?read=feed" class="navLink">Home</a>
            </li>
            <li><a href="" class="navLink">Signup</a></li>
            <li><a href="" class="navLink">Feed</a></li>
        </ul>
    <?php endif; ?>
</nav>