<!-- reusable form for new gweet upload -->

<?php if (isset($_SESSION['userId']) && isset($_SESSION['userPassword'])) : ?>
    <div id="overlay">
        <form action="gweetPost.php" method="POST" id="gweetPost">
            <h2>Post a new Gweet</h2>
            <span class="material-symbols-rounded">
                close
            </span>
            <input type="hidden" name="form" value="gweetPost">
            <textarea form="gweetPost" name="content" rows="2" cols="70" maxlength="280" placeholder="What's up ?" autofocus required></textarea>
            <input type="submit" value="Gweet">
        </form>
    </div>

<?php endif ?>