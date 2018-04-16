<?php
    session_start();
    if(isset($_POST['logout'])){
        $_SESSION['logout'] = false;
        $_SESSION['nameofuser'] = "empty";
        header("location:/timeclock/timeclock/PHP-folder/login_logout/login.php");
    }
?>