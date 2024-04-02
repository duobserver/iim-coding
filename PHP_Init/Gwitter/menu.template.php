<?php
    // VERY USEFUL LINE PLEASE REUSE EVERYWHERE
    if(!isset($_SESSION)) 
    { 
        session_start(); 
    } 
?>
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

            <a href="settings.php" id="settings" class="navLink" title="Change your account settings">
                <span class="material-symbols-rounded">settings</span>Settings
            </a>

            <a href="logout.php" id="logout" class="navLink" title="Log out of your accout">
                <span class="material-symbols-rounded">logout</span>Logout
            </a>

            <a id="gweet" class="navLink" title="Post a new gweet">
                <span class="material-symbols-rounded">send</span>Gweet
            </a>
        </div>

    <?php else : ?>
        <!-- if no one is connected -->

        <div id="navLinks">
            <a href="home.php?read=feed" id="home" class="navLink" title="Read the most recent gweets">
                <span class="material-symbols-rounded">home</span>Feed
            </a>

            </a>

            <a href="authentication.php?auth=login" id="login" class="navLink" title="Log into your accout">
                <span class="material-symbols-rounded">login</span>Login
            </a>

            <a href="authentication.php?auth=signup" id="signup" class="navLink" title="Create a new Gwitter account">
                <span class="material-symbols-rounded">assignment_ind</span>Signup
            </a>
        </div>
    <?php endif; ?>
</nav>