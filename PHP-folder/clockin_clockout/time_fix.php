<?php
    session_start();
    //take pin, date and time
    //combine date and time and create timestamp format 
    //2 "if" statements depend on user want to clock in or out this person
    //find the employee's id based on their pin and store it to employee_hours table
    $db = mysqli_connect("localhost","root","","project1");
    $date = $_POST['date'];
    $time = $_POST['time'];
    $note = $_POST['note'];
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
            $sql2 = "INSERT INTO employee_hours(id, employee_id, status, punch_timestamp, note) VALUES(null, '$employeeid', '$status', '$combinedDT','$note')";
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
            $sql2 = "INSERT INTO employee_hours(id, employee_id, status, punch_timestamp, note) VALUES(null, '$employeeid', '$status', '$combinedDT','$note')";
            mysqli_query($db, $sql2);
            }
        }
    }
    header("location:../../index.php");
?>