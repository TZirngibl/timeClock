<?php
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    if(isset($_POST['save'])){
        $id = $_POST['id'];
/////////////////////////////////////Update Name//////////////////////////////////////////
        if(isset($_POST['newname'])){
            $name = $_POST['newname'];
            $sql = "UPDATE employee SET name='$name' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
        if(empty($_POST['newname'])){
            $name = $_POST['oldname'];
            $sql = "UPDATE employee SET name='$name' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
/////////////////////////////////////Update Email//////////////////////////////////////////
        if(isset($_POST['newemail'])){
            $email = $_POST['newemail'];
            $sql = "UPDATE employee SET email='$email' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
        if(empty($_POST['newemail'])){
            $email = $_POST['oldemail'];
            $sql = "UPDATE employee SET email='$email' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
/////////////////////////////////////Password//////////////////////////////////////////
    if(isset($_POST['newpass'])){
        $pass = $_POST['newpass'];
        $hashedpass = password_hash($pass, PASSWORD_BCRYPT, array('cost' => 12));
        $sql = "UPDATE employee SET pass='$hashedpass' WHERE id='$id'";
        mysqli_query($db, $sql);
    }
    if(empty($_POST['newpass'])){
        $pass = $_POST['oldpass'];
        $sql = "UPDATE employee SET pass='$pass' WHERE id='$id'";
        mysqli_query($db, $sql);
    }
        header("location:home.php");
    }
?>