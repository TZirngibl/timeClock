<?php
    $con = mysqli_connect("localhost", "root", "", "project1");
    $sql = "SELECT * FROM employee_hours";  
    $sql2 = "SELECT name FROM employee";
    $arr = [];
    $result = $con -> query($sql);
    $result2 = $con -> query($sql2);
        if($result-> num_rows > 0){
            while($row = $result -> fetch_assoc()){
                array_push($arr,$row);
       }
    }
    echo json_encode($arr);
?>