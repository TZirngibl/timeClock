<?php
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    if(isset($_POST['register'])){
        $name = $_POST['name'];
        $pin = $_POST['pin'];
        $email = $_POST['email'];
        $dept = $_POST['dept'];
        $create_by = $_SESSION["nameofuser"];
        $lastmodify_by = $_SESSION["nameofuser"];
        $wage = $_POST['wage'];
        $wage_ot = $_POST['wage_ot'];
        //set to expire 1 year from now(256 days in seconds)
        $expire_date = time() + (256 * 24 * 60 * 60);;
        $sql = "INSERT INTO employee(id, name, pin, email, dept, create_date, create_by, lastmodify_date, lastmodify_by, wage, wage_ot) 
                VALUES(null, '$name', '$pin', '$email', '$dept', NOW(), '$create_by', NOW(), '$lastmodify_by','$wage','$wage_ot')";
        mysqli_query($db, $sql);
        header("location:../home.php");
    }
?>