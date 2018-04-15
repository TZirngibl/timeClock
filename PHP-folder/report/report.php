<?php
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    $sql = "SELECT name, pin, wage, wage_ot FROM employee";
    $result = $db-> query($sql);
    if($result-> num_rows > 0){
        while($row = $result-> fetch_assoc()){
            $date = array(
                'name' => $row['name'],
                'pin' => $row['pin'],
                'wage' => $row['wage'],
                'wage_ot' => $row['wage_ot'],
            );
        }
    }
    echo json_encode($date);
?>