<?php

session_start();

// destroy session variables
session_unset();

// terminate session
session_destroy();

header("location: authentication.php?response=3");
