<?php
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    //create variables//
    $final_arr = [];
    $employee_id = $_GET['id'];
    $type = $_GET['type'];
    $limit = $_GET['limit'];
    $date = $_GET['startdate'];
    $startdate = new DateTime($date);
    $enddate = new DateTime($date);
    
    //create variables//

    //setting the date interval base on the report type//
    if($type == "Weekly"){
        $enddate->add(new DateInterval('P8D'));
    }
    if($type == "Bi-Weekly"){
        $enddate->add(new DateInterval('P15D'));
    }
    if($type == "Monthly"){
        $enddate->add(new DateInterval('P31D'));
    }
    $startdate = $startdate->format('Y-m-d H:i:s');
    $enddate = $enddate->format('Y-m-d H:i:s');
    //setting the date interval base on the report type//

    //check if the user want to generate the report of one employee or all//
    if($_GET['id'] == null){
        $sql = "SELECT * FROM employee";
    }
    else{
        $sql = "SELECT * FROM employee WHERE id = '$employee_id'";
    }
    //check if the user want to generate the report of one employee or all//
    $starttimestamp = $startdate;
    $splitTimeStamp = explode(" ",$starttimestamp);
    $startdatesplit = $splitTimeStamp[0];
    $starttime = $splitTimeStamp[1];

    $endtimestamp = $enddate;
    $splitTimeStamp = explode(" ",$endtimestamp);
    $enddatesplit = $splitTimeStamp[0];
    $starttime = $splitTimeStamp[1];
    //create array from database//
    $result = $db-> query($sql);;
    if($result-> num_rows > 0){
        while($row = $result-> fetch_assoc()){
            $arr = [];
            $check_id = $row['id'];
            $sql_hr = " SELECT punch_timestamp, status 
                        FROM employee_hours 
                        WHERE employee_id='$check_id'
                        AND punch_timestamp between '$startdate' and '$enddate'
                        ORDER BY punch_timestamp";
            $result_hr = $db-> query($sql_hr);
            if($result_hr-> num_rows > 0){
                while($row2 = $result_hr-> fetch_assoc()){
                    $timestamp = $row2['punch_timestamp'];
                    $splitTimeStamp = explode(" ",$timestamp);
                    $date = $splitTimeStamp[0];
                    $time = $splitTimeStamp[1];
                    $date_arr = array(
                        'date' => $date,
                        'time' => $time,
                        'status' => $row2['status']
                    );
                    array_push($arr, $date_arr);
                }
            }
            $data = array(
                'start_date' => $startdatesplit,
                'end_date' => $enddatesplit,
                'id' => $row['id'],
                'type' => $type,
                'overtime_limit' => $limit,
                'dept' => $row['dept'],
                'name' => $row['name'],
                'pin' => $row['pin'],
                'wage' => $row['wage'],
                'wage_ot' => $row['wage_ot'],
                'history' => $arr
            );
            array_push($final_arr, $data);
        }  
    }
    //create array from database//
    echo json_encode($final_arr);
?>