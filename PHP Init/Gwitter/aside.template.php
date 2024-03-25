<?php require_once "database.php" ?>

<?php if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) : ?>
    <!-- if an user is connected -->

    <aside>
        <header>
            <h2>Notifications</h2>
        </header>
    </aside>

<?php else : ?>
    <!-- if no one is connected -->

    <aside>
        <header>
            <h2>New to Gwitter ?</h2>
        </header>

        <p>You can create a Gwitter account and join the Gwitverse today!</p>
        <a href="authentication.php">Sign up</a>
    </aside>

<?php endif; ?>