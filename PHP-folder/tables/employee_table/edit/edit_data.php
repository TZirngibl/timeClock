<?php
    session_start();
    // get the id find the employee with the same id 
    // update their info based on what info being passed
    $db = mysqli_connect("localhost","root","","project1");
    if(isset($_POST['save'])){
        $id = $_POST['id'];
        $name = $_POST['editename'];
        $pin = $_POST['editepin'];
        $email = $_POST['editeemail'];
        $dept = $_POST['editedept'];
        $create_by = $_SESSION["nameofuser"];
        $lastmodify_by = $_SESSION["nameofuser"];
        $wage = $_POST['editewage'];
        $wage_ot = $_POST['editeot_wage'];
        //set to expire 1 year from now(256 days in seconds)
        $expire_date = time() + (256 * 24 * 60 * 60);;
        $sql = "UPDATE employee SET name='$name', pin='$pin', email='$email',dept = '$dept', wage = '$wage', wage_ot = '$wage_ot' WHERE id='$id'";
        mysqli_query($db, $sql);
        echo 'hi';
        header("location:../../../../index.php");
    }
?>