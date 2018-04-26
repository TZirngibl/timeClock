<?php
    session_start();
    //take all the info that passed from the form 
    //hash the password, check their level
    //then insert it to database
    $db = mysqli_connect("localhost","root","","project1");
    if(isset($_POST['register'])){
        $name = $_POST['addmname'];
        $email = $_POST['addmemail'];
        $pass = $_POST['inputmPassword'];
        $hashedpass = password_hash($pass, PASSWORD_BCRYPT, array('cost' => 12));
        if($_POST['isManager'] == "Yes"){
            $level = 'm';
        }
        else{
            $level = 'u';
        }
        $create_by = $_SESSION["nameofuser"];
        $lastmodify_by = $_SESSION["nameofuser"];
        //set to expire 1 year from now(256 days in seconds)
        $expire_date = time() + (256 * 24 * 60 * 60);;
        $sql = "INSERT INTO manager(id, name, email, pass, level, create_date, create_by, lastmodify_date, lastmodify_by, expire_date) 
                VALUES(null, '$name', '$email', '$hashedpass', '$level', NOW(), '$create_by', NOW(), '$lastmodify_by','$expire_date')";
        mysqli_query($db, $sql);
        header("location:../../index.php");
    }
?>