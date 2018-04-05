<?php
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    $arr = array();
    $arr2 = [];
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $sql = "SELECT name, pin FROM employee WHERE id='$id'";
        $result = $db-> query($sql);
        if($result-> num_rows > 0){
            while($row = $result-> fetch_assoc()){
                $sql2 = "SELECT punch_timestamp, status  FROM employee_hours WHERE employee_id='$id'";
                $result2 = $db-> query($sql2);
                if($result2-> num_rows > 0){
                    while($row2 = $result2-> fetch_assoc()){
                        $timestamp = $row2['punch_timestamp'];
                        $splitTimeStamp = explode(" ",$timestamp);
                        $date = $splitTimeStamp[0];
                        $time = $splitTimeStamp[1];
                        $arr[] = $row + $row2;
                    }
                }
            }
        }
        echo json_encode($arr);
    }
?>