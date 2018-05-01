<?php
    session_start();
    // get the id find the record with the same id 
    // update the note based on what info being passed
    $db = mysqli_connect("localhost","root","","project1");
    if(isset($_POST['savenote'])){
        $id = $_POST['id'];
        $newnote = $_POST['newnote'];
        $sql = "UPDATE employee_hours SET note='$newnote' WHERE id='$id'";
        mysqli_query($db, $sql);
        header("location:../../../../index.php");
    }
?>