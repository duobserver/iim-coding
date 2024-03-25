<!-- reusable article for showing gweets -->
<!-- WARNING: a $gweets variable is required in the calling file -->

<div class="gweets">
    <?php if (count($gweets) == 0) : // if there is nothing to show 
    ?>
        <?php if ($_GET['read'] == "author") : // if it was supposed to show gweets posted by a specific user 
        ?>
            <div id="empty">
                <span class="material-symbols-rounded">
                    sentiment_dissatisfied
                </span>
                <p id="emptyMessage">Looks like @<?php echo $profile[0]['userName'] ?> didn't post any gweets yet</p>
            </div>

        <?php elseif ($_GET['read'] == "followers") : // if it was supposed to show the followers of a specific user 
        ?>
            <div id="empty">
                <span class="material-symbols-rounded">
                    sentiment_dissatisfied
                </span>
                <p id="emptyMessage">Looks like no one is following @<?php echo $profile[0]['userName'] ?> yet</p>
            </div>

        <?php elseif ($_GET['read'] == "followingu") : // if it was supposed to show the users followed by a specific user 
        ?>
            <div id="empty">
                <span class="material-symbols-rounded">
                    sentiment_dissatisfied
                </span>
                <p id="emptyMessage">Looks like @<?php echo $profile[0]['userName'] ?> isn't following anyone yet</p>
            </div>

        <?php elseif ($_GET['read'] == "likes") : // if it was supposed to show gweets liked by a specific user 
        ?>
            <div id="empty">
                <span class="material-symbols-rounded">
                    sentiment_dissatisfied
                </span>
                <p id="emptyMessage">Looks like @<?php echo $profile[0]['userName'] ?> didn't drop any like yet</p>
            </div>

        <?php elseif ($_GET['read'] == "following") : // if it was supposed to show gweets from users followed by connected user
        ?>
            <div id="empty">
                <span class="material-symbols-rounded">
                    sentiment_dissatisfied
                </span>
                <p id="emptyMessage">Looks like you're not following anyone on Gwitter</p>
            </div>
        <?php endif; ?>

    <?php else : ?>

        <?php if (isset($_GET['people'])) : ?>
            <?php foreach ($gweets as $gweet) : ?>
                <!-- for each gweet in the variable -->

                <div class="gweet">
                    <a href="profile.php?userId=<?php echo $gweet['userId']; ?>&read=author">
                        <!-- profile picture column -->
                        <span class="material-symbols-rounded gweetPfp" style="color: <?php echo $gweet['userColor']; ?>;">
                            account_circle
                        </span>
                    </a>

                    <div class="gweetText">
                        <!-- text column -->
                        <h3 class="gweetTitle">
                            <a href="profile.php?userId=<?php echo $gweet['userId']; ?>&read=author" class="gweetAuthor" style="color: <?php echo $gweet['userColor']; ?>;">
                                <?php echo $gweet['userName']; ?>
                            </a>

                        </h3>
                    </div>
                </div>
            <?php endforeach; ?>

        <?php else : ?>
            <?php foreach ($gweets as $gweet) : ?>
                <!-- for each gweet in the variable -->

                <div class="gweet">
                    <a href="profile.php?userId=<?php echo $gweet['userId']; ?>&read=author">
                        <!-- profile picture column -->
                        <span class="material-symbols-rounded gweetPfp" style="color: <?php echo $gweet['userColor']; ?>;">
                            account_circle
                        </span>
                    </a>

                    <div class="gweetText">
                        <!-- text column -->
                        <h3 class="gweetTitle">
                            <a href="profile.php?userId=<?php echo $gweet['userId']; ?>&read=author" class="gweetAuthor" style="color: <?php echo $gweet['userColor']; ?>;">
                                <?php echo $gweet['userName']; ?>
                            </a>

                            <span class="gweetDate" title=<?php echo "'" . $gweet['gweetDate'] . "'"; ?>>
                                &#xa0;&#8226; <?php echo $gweet['gweetAge']; ?>
                            </span>

                        </h3>

                        <article class="gweetContent"><?php echo $gweet['gweetContent']; ?></article>

                        <?php if (isset($_SESSION['userId'])) : // if an user is logged in 
                        ?>

                            <div class="gweetInteractions">
                                <?php if ($gweet['liked'] == "TRUE") : ?>
                                    <!-- if the user liked this gweet -->

                                    <form action="interactions/like.php" method="POST">
                                        <input type="hidden" name="form" value="like">
                                        <input type="hidden" name="likeId" value=<?php echo $gweet['gweetId'] ?>>
                                        <button type="submit" class="likeButton" title="Dislike this gweet">
                                            <span class="material-symbols-rounded like true">
                                                favorite
                                            </span>
                                        </button>
                                    </form>

                                <?php else : ?>
                                    <form action="interactions/like.php" method="POST">
                                        <input type="hidden" name="form" value="like">
                                        <input type="hidden" name="likeId" value=<?php echo $gweet['gweetId'] ?>>
                                        <button type="submit" class="likeButton" title="Like this gweet">
                                            <span class="material-symbols-rounded like">
                                                favorite
                                            </span>
                                        </button>
                                    </form>

                                <?php endif; ?>

                                <?php if (isset($_SESSION['userId']) && $gweet['userId'] == $_SESSION['userId']) : ?>
                                    <!-- if the user is connected and posted this gweet -->

                                    <form action="interactions/delete.php" method="POST">
                                        <input type="hidden" name="form" value="delete">
                                        <input type="hidden" name="mode" value="gweet">
                                        <input type="hidden" name="gweetId" value=<?php echo $gweet['gweetId'] ?>>
                                        <button type="submit" class="deleteButton" title="Delete this gweet">
                                            <span class="material-symbols-rounded delete">
                                                delete
                                            </span>
                                        </button>
                                    </form>
                                <?php endif; ?>
                            </div>

                        <?php endif; ?>

                    </div>
                </div>

            <?php endforeach; ?>
        <?php endif; ?>
    <?php endif; ?>
</div>