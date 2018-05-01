<?php 
    // get the id get the employee with the same id 
    // get their info then put it into an array
    session_start();
    $arr = [];
    $db = mysqli_connect("localhost","root","","project1");
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $sql = "SELECT id, note FROM employee_hours WHERE id='$id'";
        $result = $db-> query($sql);
        if($result-> num_rows > 0){
            while($row = $result -> fetch_assoc()){
                array_push($arr, $row);
            }
        }
        echo json_encode($arr);
    }
?>