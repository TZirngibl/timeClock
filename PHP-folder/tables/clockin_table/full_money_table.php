<?php
    $con = mysqli_connect("localhost", "root", "", "project1");
    $arr = [];
    $final = [];
    $load_limit = $_GET['load_limit'];
    $current_location = $_GET['current_location'];
    $min = $current_location;
    $max = $current_location + $load_limit;
    $sql = "SELECT * FROM employee_hours ORDER BY id DESC LIMIT $current_location, $load_limit ";  
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
                            'note' => $row['note'],
                        );
                        array_push($final, $arr);
                    }
                }
            }
        }
    echo json_encode($final);
?>