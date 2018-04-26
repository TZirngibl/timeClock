<?php
    session_start();
    $db = mysqli_connect("localhost", "root", "", "project1");
    $arr = [];
    $final = [];
        $startdate = $_GET['poststart']; //get start date
        $startdatecon = new DateTime($startdate); //convert to timestamp format
        $startdatecon = $startdatecon->format('Y-m-d H:i:s');
        $enddate = $_GET['postend']; //get enddate
        $enddatecon = new DateTime($enddate);//convert to timestamp format
        //add 23 hr 59 min to the end date to make sure it take every record of that day
        $enddatecon->add(new DateInterval('PT23H59M')); 
        $enddatecon =  $enddatecon->format('Y-m-d H:i:s');
        //select all the recodr between date range
        $sql = "SELECT * FROM employee_hours WHERE 
                        punch_timestamp between '$startdatecon' and '$enddatecon' ORDER BY punch_timestamp";
        $result = $db -> query($sql);
        if($result-> num_rows > 0){
            while($row = $result -> fetch_assoc()){
                $employee_id = $row['employee_id'];
                //find the employee with the same id and get their name and pin 
                $sql2 = "SELECT * FROM employee WHERE id = '$employee_id' ";
                $result2 = $db -> query($sql2);
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