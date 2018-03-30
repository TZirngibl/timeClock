<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" media="screen" href="../CSS-folder/login.css"/>
    <title>Login</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="JS-folder/fadein.js"></script>
</head>
<body>
        <div class="form">
            <img src="../Art/welcome.gif" id = "welcome">
            <div class="message">
                <?php 
                    echo '<font color="red">'. $_SESSION['errors'] .'</font>';
                    $_SESSION['errors'] = "";
                ?>
            </div>
            <form method="post" action="logindata.php" class="login-form">
                <input type="text"      name="email"     placeholder="Your Email"/>
                <input type="password"  name="pass"     placeholder="password"/>
                <input id="login" type="submit" name="login" value="login"/> 
            </form>
        </div>
</body>
</html>
