<?php
    session_start();
    $db = mysqli_connect("localhost", "root", "", "project1");
    $arr = [];
    if(isset($_POST['submitdates'])){
        $startdate = $_POST['startdate'];
        $startdatecon = new DateTime($startdate);
        $startdatecon = $startdatecon->format('Y-m-d H:i:s');
        $enddate = $_POST['enddate'];
        $enddatecon = new DateTime($enddate);
        $enddatecon->add(new DateInterval('PT23H59M'));
        $enddatecon =  $enddatecon->format('Y-m-d H:i:s');
        $sql = "SELECT * FROM employee_hours WHERE 
                        punch_timestamp between '$startdatecon' and '$enddatecon'";
        $result = $db -> query($sql);
        if($result-> num_rows > 0){
            while($row = $result -> fetch_assoc()){
                array_push($arr,$row);
       }
    }
}
    echo json_encode($arr);
?>