<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once "presets/reels.php" ?>
    <link rel="stylesheet" href="css/settings.css">

    <title>Settings | Gwitter</title>
</head>

<body>
    <!-- external php components -->
    <?php require_once "presets/components.php"; ?>

    <main>

        <head id="ribbonHeader">
            <h2>Settings</h2>
        </head>

        <form action="settings.php" method="POST" id="settingsForm">
            <input type="hidden" name="form" value="settings">
            <div class="row"><label for="userName">Name</label>
                <input type="text" id="userName" name="userName" value=<?php echo $settings[0]['userName']; ?> required>
            </div>

            <div class="row"><label for="userEmail">Email</label>
                <input type="email" id="userEmail" name="userEmail" value=<?php echo $settings[0]['userEmail']; ?> required>
            </div>

            <div class="row"><label for="newPassword">New password</label>
                <input type="password" id="newPassword" name="newPassword">
            </div>

            <div class="row"><label for="userBio">Bio</label>
                <textarea form="settingsForm" id="userBio" name="userBio" rows="2" cols="70" maxlength="255" required><?php echo $settings[0]['userBio']; ?></textarea>
            </div>

            <div class="row"><label for="userColor">Color</label>
                <input type="color" id="userColor" name="userColor" value=<?php echo $settings[0]['userColor']; ?> required>
            </div>

            <div class="row"><label for="userPassword">Type your current password to confirm changes</label>
                <input type="password" id="userPassword" name="userPassword" required>
            </div>
            <input type="submit" value="Save">
        </form>
    </main>
</body>

</html>