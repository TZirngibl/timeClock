<?php 
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $sql = "DELETE FROM employee_hours WHERE id='$id'";
        //echo $sql;
        //$result = $db-> query($sql);
        echo $id;
        mysqli_query($db, $sql) or die("error");
    }
?>