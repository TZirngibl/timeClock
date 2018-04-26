<?php
    $con = mysqli_connect("localhost", "root", "", "project1");
    $sql = "SELECT COUNT(*) from employee_hours";
    $result = $con -> query($sql);
    $row = mysqli_fetch_assoc($result);
    //$total = $row->num_rows;
    echo $row;
?>