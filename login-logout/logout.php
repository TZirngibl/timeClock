<?php
    session_start();
    if(isset($_POST['login'])){
        $_SESSION['login'] = false;
        $_SESSION['nameofuser'] = "empty";
        header("location:login.php");
    }
?>