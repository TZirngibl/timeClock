<?php 
    // get the id find the employee with the same id and delete that emmployee from database
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $sql = "DELETE FROM manager WHERE id='$id'";
        echo $id;
        mysqli_query($db, $sql) or die("error");
    }
?>