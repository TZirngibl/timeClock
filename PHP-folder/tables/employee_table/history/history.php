<?php
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    $arr = [];
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $sql = "SELECT name, pin, wage, wage_ot FROM employee WHERE id='$id'";
        $result = $db-> query($sql);
        if($result-> num_rows > 0){
            while($row = $result-> fetch_assoc()){
                $sql2 = "SELECT punch_timestamp, status  
                        FROM employee_hours 
                        WHERE employee_id='$id'";
                $result2 = $db-> query($sql2);
                if($result2-> num_rows > 0){
                    while($row2 = $result2-> fetch_assoc()){
                        $timestamp = $row2['punch_timestamp'];
                        $splitTimeStamp = explode(" ",$timestamp);
                        $date = $splitTimeStamp[0];
                        $time = $splitTimeStamp[1];
                        $data = array(
                            'name' => $row['name'],
                            'pin' => $row['pin'],
                            'wage' => $row['wage'],
                            'wage_ot' => $row['wage_ot'],
                            'status' => $row2['status'],
                            'date' => $date,
                            'time' => $time
                        );
                        array_push($arr, $data);
                    }
                }
            }
        }
        echo json_encode($arr);
    }
?>
