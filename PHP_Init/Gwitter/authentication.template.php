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
        <?php if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) : ?>
            <!-- if a user is logged in -->
            <header id="ribbonHeader">
                <h2>Authentication</h2>
            </header>

            <?php if(isset($_GET['response'])) { echo $_GET['response']; }; ?>

            <?php $data = ['userId' => $_SESSION['userId']]; ?>
            <?php $query = $database->prepare("SELECT userName FROM users WHERE userId=:userId"); ?>
            <?php $query->execute($data); ?>
            <?php $name = $query->fetchAll(PDO::FETCH_ASSOC); ?>

            <p>You are currently logged in as @<?php echo $name[0]['userName']; ?></p>

        <?php else : ?>
            <!-- if no one is logged in -->

            <header id="ribbonHeader">
                <h2>Authentication</h2>
                <div class="headerRow">
                    <a href="?auth=login" id="loginLink">Login</a>
                    <a href="?auth=signup" id="signupLink">Signup</a>
                </div>
            </header>

            <?php if(isset($_GET['response'])) { echo $_GET['response']; }; ?>

            <form action="authentication.php" method="POST" id="loginForm">
                <input type="hidden" name="form" value="login">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <input type="submit" value="Login">
            </form>

            <form action="authentication.php" method="POST" id="signupForm">
                <input type="hidden" name="form" value="signup">
                <input type="text" name="username" placeholder="Username" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <!-- <input type="password" name="passwordCheck" placeholder="Rewrite password"> -->
                <input type="submit" value="Sign up">
            </form>

        <?php endif; ?>
    </main>

    <script src="javascript/authentication.js"></script>
</body>

</html>