<?php
    session_start();
    $db = mysqli_connect("localhost", "root", "", "project1");
    $sql = "SELECT * FROM manager LIMIT 5";
    $arr = [];
    $result = $db -> query($sql);
        if($result-> num_rows > 0){
            while($row = $result -> fetch_assoc()){
                array_push($arr,$row);
       }
    }
    echo json_encode($arr);
?>