<!-- reusable form for new gweet upload -->

<?php if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) : ?>

    <form action="gweet.php" method="POST" id="gweet">
        <input type="hidden" name="form" value="gweet">
        <textarea name="content" rows="1" cols="70" maxlength="280" placeholder="What's up ?"></textarea>
        <input type="submit" value="Gweet">
    </form>

<?php endif ?>