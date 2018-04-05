<?php
    session_start();
    if($_SESSION['login'] == FALSE){
        header("location:PHP-folder/login_logout/login.php");
        die;
    }
    $con = mysqli_connect("localhost", "root", "", "project1");
    $sql = "SELECT * FROM employee";
    $result = $con -> query($sql);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Home</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" type="text/css" media="screen" href="CSS-folder/button.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="CSS-folder/home.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="CSS-folder/table.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="CSS-folder/register.css" />
    <script>
  $( function() {
    $( "#datepicker" ).datepicker();
    $( "#datepicker2" ).datepicker();
  } );
  </script>
    
</head>
<body>
    <div class="general">
        <div class="menu">
            <div class="admin">
                <img src="Art/profile.png" class="profile-pic">
                <?php 
                    echo "Welcome, ". $_SESSION["nameofuser"];
                ?>
            </div>
            <ul class="listmenu">
                <li><button class="button6 button5" type="button" id="managers">Home</button></li>
                <li><button class="button6 button5" type="button" id="money">Reports</button></li>
                <li><button class="button6 button5" type="button" id="createmanager">Create New Manager</button></li>
                <li><button class="button6 button5" type="button" id="clockinbtn">Clock In</button></li>
                <li><button class="button6 button5" type="button" id="clockoutbtn">Clock Out</button></li>
                <form method="post" action="PHP-folder/login_logout/log_out.php" class="logout">
                <li><button class="button6 out button5" type="submit" name="login" value="login">Logout</button></li>
                </form>
            </ul>
        </div>
        <div class="container">
        <div class="table-manager">
            <div class="search-container">
				<div class="search-input">
                    <div class="searchicon"></div>
                <div id ="employeesearchbar">
                <input type="text" name="search_text" id="search_text" placeholder=" Search Employees by Name" class="form-control search_text" />
                </div>
                <div id ="moneysearchbar">
                <input type="text" name="moneysearch_text" id="moneysearch_text" placeholder=" Search Clock Records by Employee ID" class="form-control search_text" />
                </div>

                </div>
            </div>
            <div>
                <!-- !!!!!!!  DATEPICKERS HERE  !!!!!! -->
                <!-- hoang we need to use this to query results to the employee_hours table. store result in yatable/result div -->
                <div id = "dates">
                
                    <p>Start Date: <input type="text" name="startdate" id="datepicker"></p>
                    <p>End Date:   <input type="text" name="enddate" id="datepicker2"></p>
                    <input type="submit" id="submitdates" value="Search Date Range" name="submitdates">
                    
                </div>
            <table id="yatable">            
                <tbody class="result">
                </tbody>
            </table>
                <div id="createbuttons">
                    <button class="button6" type="button" id="createuser">Create New Employee</button>
                </div>
            </div><!--yatable-->
</div>
</div>
</div>

</body>
<!-- The Modal -->
<div class="modal_container" id="managermodal_container">
                <div class="modal" id="managermodalslide">
                    <p id="registerform">Create  New  Manager</p>
                        <form method="post" action="PHP-folder/create_users_manager/register_manager_data.php" class="register-form">
                             <input type="text"      name="name"     placeholder="Your Name"/>
                             <input type="text"      name="email"    placeholder="E-mail Address"/>
                             <input type="password"  name="pass"     placeholder="Password"/>
                             <span id="managertext">Manager?</span>
                             <input type="checkbox" name="level" id="x" value="manager" class="checkmark"></label>
                             <input id="registermanager" type="submit" name="register" value="Register"/> 
                         </form>
                         <span class="close" href="#">X</span>
                </div><!--modal-->
                </div><!--modal_container-->
                <div class="modal_container" id="usermodal_container">
                <div class="modal">
                    <p id="registerform">Create  New  Employee</p>
                        <form method="post" action="PHP-folder/create_users_manager/register_user_data.php" class="register-form">
                            <input type="text"      name="name"     placeholder="Your Name"/>
                            <input type="text"      name="email"    placeholder="E-mail Address"/>
                            <input type="text"      name="pin"     placeholder="PIN(Format ### i.e (000/123)"/>
                            <input type="int"      name="dept"     placeholder="Department(Format ###)"/>
                            <input type="int"      name="wage"     placeholder="Hourly Wage"/>
                            <input type="int"      name="wage_ot"     placeholder="Hourly OVERTIME Wage"/>
                            <input id="registeruser" type="submit" name="register" value="Register"/> 
                        </form>
                        <span class="close3" href="#">X</span>
                </div><!--modal-->
                </div><!--modal_container-->
<!-- Edit User Modal -->
<div class="edit_modal" id="edit_modal">
    <div class="emodal">
        <p id="editmodaltoptext">Edit User</p>
            <form method="post" action="PHP-folder/tables/employee_table/edit/edit_data.php" class="editusertext" id="editgrid">
                <input id= "idchange"           type="hidden"           name="id"               readonly/>
                <label for="oldname">Current Name:              <input id= "namechange"     type="text"      name="oldname"      readonly/> </label>
                <label for="newname">New Name:                  <input                      type="text"      name="newname"      placeholder="Name"/>    </label>
                <label for="oldpin">Current Pin:                <input id= "pinchange"      type="text"      name="oldpin"       readonly/></label>
                <label for="newpin">New Pin:                    <input                      type="text"      name="newpin"       placeholder="PIN(Format ### i.e (000/123)"/>   </label>
                <label for="oldemail">Current E-mail:           <input id= "emailchange"    type="text"      name="oldemail"     readonly/></label>
                <label for="newemail">New E-mail:               <input                      type="text"      name="newemail"     placeholder="E-mail Address"/>      </label>          
                <label for="olddept">Current Department:        <input id= "deptchange"     type="text"      name="olddept"      readonly/></label>
                <label for="newdept">New Dept:                  <input                      type="text"      name="newdept"      placeholder="Department(Format ###)"/></label>
                <label for="oldwage">Current Wage:              <input id= "wagechange"     type="text"      name="oldwage"      readonly/></label>
                <label for="newwage">New Wage:                  <input                      type="text"      name="newwage"      placeholder="Hourly wage"/></label>
                <label for="oldwage_ot">Current Overtime Wage:  <input id= "wage_otchange"  type="text"      name="oldwage_ot"      readonly/></label>
                <label for="newwage_ot">New Overtime Wage:      <input                      type="text"      name="newwage_ot"      placeholder="Overtime Wage"/></label>
                <input id="save" type="submit" name="save" value="Save Changes"/> 
            </form>
        <span class="close2" href="#">X</span>
    </div>
</div>
<!-- Clock In Modal -->
<div class="modal_container" id="clockinmodal_container">
    <div class="modal">
        <p id="registerform">Clock In</p>
            <form method="post" action="PHP-folder/clockin_clockout/clock_in.php" class="register-form">
                <label for="pin">PIN:<input type="" name="pin" placeholder="###"/>
                <input id="clockin" type="submit" name="clockin" value="Clock In"/> 
            </form>
        <span class="close4" href="#">X</span>
    </div>
</div>
<!-- Clock Out Modal -->
<div class="modal_container" id="clockoutmodal_container">
    <div class="modal">
        <p id="registerform">Clock Out</p>
            <form method="post" action="PHP-folder/clockin_clockout/clock_out.php" class="register-form">
                <label for="pin">PIN:<input type="" name="pin" placeholder="###"/>
                <input id="clockout" type="submit" name="clockout" value="Clock Out"/> 
            </form>
        <span class="close5" href="#">X</span>
    </div>
</div>
</html>
<script src="JS-folder/home.js"></script>
<script src="JS-folder/employee_table.js"></script>
<script src="JS-folder/money_table.js"></script>
