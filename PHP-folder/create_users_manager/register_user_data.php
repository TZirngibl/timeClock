<?php
    session_start();
    //take all the info that passed from the form 
    //then insert it to database
    $db = mysqli_connect("localhost","root","","project1");
    if(isset($_POST['register'])){
        $name = $_POST['addename'];
        $pin = $_POST['addepin'];
        $email = $_POST['addeemail'];
        $dept = $_POST['addedept'];
        $create_by = $_SESSION["nameofuser"];
        $lastmodify_by = $_SESSION["nameofuser"];
        $wage = $_POST['addewage'];
        $wage_ot = $_POST['addeot_wage'];
        //set to expire 1 year from now(256 days in seconds)
        $expire_date = time() + (256 * 24 * 60 * 60);;
        $sql = "INSERT INTO employee(id, name, pin, email, dept, create_date, create_by, lastmodify_date, lastmodify_by, wage, wage_ot) 
                VALUES(null, '$name', '$pin', '$email', '$dept', NOW(), '$create_by', NOW(), '$lastmodify_by','$wage','$wage_ot')";
        mysqli_query($db, $sql);
        header("location:../../index.php");
    }
?>