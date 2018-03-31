<?php
    $con = mysqli_connect("localhost", "root", "", "project1");
    $sql = "SELECT * FROM employee";
    $arr = [];
    $result = $con -> query($sql);
        if($result-> num_rows > 0){
            while($row = $result -> fetch_assoc()){
                array_push($arr,$row);
       }
    }
    echo json_encode($arr);
?>