<?php
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    if(isset($_POST['clockin'])){
/////////////////////////////////////Update Name//////////////////////////////////////////
        if(isset($_POST['pin'])){
            $pin = $_POST['pin'];
            $sql="SELECT id from employee WHERE pin = '$pin'";
            $employeeid = null;
            $result = $db-> query($sql);
            if($result-> num_rows > 0){
                while($row = $result-> fetch_assoc()){
                    $employeeid = $row['id'];
                }
            // Free result set
            mysqli_free_result($result);
            }
            $sql2 = "INSERT INTO employee_hours(id, employee_id, status, punch_timestamp) VALUES(null, '$employeeid', 'in', NOW())";
            mysqli_query($db, $sql2);
        }
        if(empty($_POST['pin'])){
            return;
        }
        header("location:../../home.php");
    }
?>