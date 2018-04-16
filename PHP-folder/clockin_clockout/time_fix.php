<?php
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    $date = $_POST['date'];
    $time = $_POST['time'];
    $combinedDT = date('Y-m-d H:i:s', strtotime("$date $time"));
    if(isset($_POST['clockin'])){
        $status = "in";
        if(isset($_POST['pin'])){
            $pin = $_POST['pin'];
            $sql="SELECT id from employee WHERE pin = '$pin'";
            $employeeid = null;
            $result = $db-> query($sql);
            if($result-> num_rows > 0){
                while($row = $result-> fetch_assoc()){
                    $employeeid = $row['id'];
                }
            $sql2 = "INSERT INTO employee_hours(id, employee_id, status, punch_timestamp) VALUES(null, '$employeeid', '$status', '$combinedDT')";
            mysqli_query($db, $sql2);
            }
        }
    }
    if(isset($_POST['clockout'])){
        $status = "out";
        if(isset($_POST['pin'])){
            $pin = $_POST['pin'];
            $sql="SELECT id from employee WHERE pin = '$pin'";
            $employeeid = null;
            $result = $db-> query($sql);
            if($result-> num_rows > 0){
                while($row = $result-> fetch_assoc()){
                    $employeeid = $row['id'];
                }
            $sql2 = "INSERT INTO employee_hours(id, employee_id, status, punch_timestamp) VALUES(null, '$employeeid', '$status', '$combinedDT')";
            mysqli_query($db, $sql2);
            }
        }
    }
    header("location:../../index.php");
?>