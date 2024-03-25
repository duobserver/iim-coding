<!-- reusable article for showing gweets -->
<!-- WARNING: a $gweets variable is required in the calling file -->

<div class="gweets">

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


</div>