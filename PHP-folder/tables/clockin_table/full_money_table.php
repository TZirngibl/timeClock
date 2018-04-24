<?php
    $con = mysqli_connect("localhost", "root", "", "project1");
    $arr = [];
    $final = [];
    $sql = "SELECT * FROM employee_hours ORDER BY punch_timestamp";  
    $result = $con -> query($sql);
        if($result-> num_rows > 0){
            while($row = $result -> fetch_assoc()){
                $employee_id = $row['employee_id'];
                $sql2 = "SELECT * FROM employee WHERE id = '$employee_id'";
                $result2 = $con -> query($sql2);
                if($result2 -> num_rows > 0){
                    while($row2 = $result2 -> fetch_assoc()){
                        $arr = array(
                            'id'   => $row['id'],
                            'name' => $row2['name'],
                            'pin' => $row2['pin'],
                            'status' => $row['status'],
                            'time' => $row['punch_timestamp'],
                        );
                        array_push($final, $arr);
                    }
                }
            }
        }
    echo json_encode($final);
?>