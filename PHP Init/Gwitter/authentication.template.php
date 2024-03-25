<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once "presets/reels.php" ?>
    <link rel="stylesheet" href="css/authentication.css">

    <title>Authentication | Gwitter</title>
</head>

<body>
    <?php require_once "presets/components.php" ?>

    <main>
        <?php if (isset($_GET['response'])) : ?>
            <?php
            /* authentication response codes

            1: successful login
            2: failed login
            3: successful logout
            4: successful signup (login required)
            5: failed signup
            */

            $response = $_GET['response'];
            if ($response == 1) {
                echo '<div class="success">Successfully logged in</div>';
            } elseif ($response == 2) {
                echo '<div class="error">Invalid credentials</div>';
            } elseif ($response == 3) {
                echo '<div class="success">Succesfully logged out</div>';
            } elseif ($response == 4) {
                echo '<div class="success">New account created succesfully, please login with your credentials</div>';
            } elseif ($response == 5) {
                echo '<div class="error">Could not create new account</div>';
            };
            ?>
        <?php endif; ?>

        <?php if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) : ?>
            <!-- if a user is logged in -->
            <header id="ribbonHeader">
                <h2>Authentication</h2>
            </header>

            <?php $data = ['userId' => $_SESSION['userId']]; ?>
            <?php $query = $database->prepare("SELECT userName FROM users WHERE userId=:userId"); ?>
            <?php $query->execute($data); ?>
            <?php $name = $query->fetchAll(PDO::FETCH_ASSOC); ?>

            <p>You are currently logged in as @<?php echo $name[0]['userName']; ?></p>

            <!-- <pre>
                <?php var_dump($_SESSION); ?>
            </pre> -->

        <?php else : ?>
            <!-- if no one is logged in -->

            <header id="ribbonHeader">
                <h2>Authentication</h2>
                <div class="headerRow">
                    <a href="" class="feed">Login</a>
                    <a href="" class="following">Signup</a>
                </div>
            </header>
            <form action="authentication.php" method="POST">
                <input type="hidden" name="form" value="login">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <input type="submit" value="Login">
            </form>

            <form action="authentication.php" method="POST">
                <input type="hidden" name="form" value="signup">
                <input type="text" name="username" placeholder="Username" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <!-- <input type="password" name="passwordCheck" placeholder="Rewrite password"> -->
                <input type="submit" value="Sign up">
            </form>

        <?php endif; ?>
    </main>

    <?php require_once "aside.template.php"; ?>
</body>

</html>