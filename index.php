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
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="index.css">
<!--date picker css-->
<link href="https://cdn.jsdelivr.net/npm/gijgo@1.9.6/css/gijgo.min.css" rel="stylesheet" type="text/css" />
<title>CRST Timeclock</title>
</head>
<body>
<div class="container-fluid">
<div id = "everything">
<div id="wrapper" class = "toggled">
        <!-- Sidebar -->
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand"><a href="#" class="homepage">CRST Timeclock</a></li>
                <li><a href="#" class="homepage">Home</a></li>
                <li><a href="#" id="reportcontainer">Reports</a></li>
                <li>
                <form method="post" action="PHP-folder/login_logout/log_out.php" class="logout">
                <input type="submit" id="logout" name="logout" value="Logout" class="btn-link"></li>
                </form>
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
            
                <div id="home-page-wrapper">
                <!--NAVBAR-->
                    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" id="homenavbar">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <a class="navbar-brand" href="#">Employees</a>
                            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li class="nav-item"><a class="nav-link" href="#" data-toggle="modal" data-target="#addEmployee">Add Employee <span class="sr-only">(current)</span></a></li>
                                </ul>
                                <!-- EMPLOYEE PAGINATOR -->
                                <ul class="pagination justify-content-end flex-wrap paginatorss">
                                            <li class="page-item">
                                            <a class="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                                <span class="sr-only">Previous</span>
                                            </a>
                                            </li>
                                            <li class="page-item">
                                            <a class="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                                <span class="sr-only">Next</span>
                                            </a>
                                            </li>
                                        </ul><!-- end EMPLOYEE PAGINATOR -->
                                <form class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search By Name" aria-label="Search" id="employeesearch">
                                </form>
                            </div>
                    </nav>
                        <!--MANAGER AND EMPLOYEE TABLES-->
                        <!--EMPLOYEES-->
                        <div class="table-responsive-md emptable">
                            <table class="table table-fixed">
                                <thead class="" id="employeetableheader">
                                    <tr>
                                        <th class="col-md-2">Name</th>
                                        <th class="col-md-1">Pin</th>
                                        <th class="col-md-3">Email</th>
                                        <th class="col-md-1">Dept</th>
                                        <th class="col-md-1">Modify Date</th>
                                        <th class="col-md-1">Modify By</th>
                                        <th class="col-md-1">Wage</th>
                                        <th class="col-md-1">OTWage</th>
                                        <th class="col-md-1">Action</th>
                                    </tr>
                                </thead>

                                <tbody class="employeetablerow" id="employeetablebody"></tbody>

                            </table>
                                
                                </div>
                                <!-- MANAGER NAVBAR -->
                                <nav class="navbar navbar-expand-lg navbar-dark bg-primary" id="homenavbar">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <a class="navbar-brand" href="#">Managers</a>
                            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li class="nav-item"><a class="nav-link" href="#" data-toggle="modal" data-target="#addManager">Add Manager</a></li>
                                </ul>
                                <!-- MANAGER PAGINATOR -->
                                <ul class="pagination justify-content-end flex-wrap paginatorss">
                                        <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        </li>
                                        <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                        </li>
                                    </ul><!-- end MANAGER PAGINATOR -->
                                <form class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search By Name" aria-label="Search" id="managersearch" name="searchmanager">
                                </form>
                            </div>
                    </nav><!-- end MANAGER NAVBAR-->
                        <!--MANAGERS-->
                        <div class="table-responsive-md mantable">
                            <table class="table table-fixed ">
                                <thead class="" id="managertableheader">
                                    <tr>
                                        <th class="col-md-2">Name</th>
                                        <th class="col-md-3">Email</th>
                                        <th class="col-md-1">Level</th>
                                        <th class="col-md-1">Created</th>
                                        <th class="col-md-1">Create By</th>
                                        <th class="col-md-1">Modified</th>
                                        <th class="col-md-1">Modify By</th>
                                        <th class="col-md-1">Expire Date</th>
                                        <th class="col-md-1">Action</th>
                                    </tr>
                                </thead>

                                <tbody id="managertablebody"></tbody>

                            </table>

                        </div>
                    </div><!-- /#home-page-wrapper -->
                    <!--REPORTS PAGE-->
                        <div id="reportspage">
                            <!--REPORTS NAVBAR-->
                            <nav class="navbar navbar-expand-lg navbar-dark bg-success" id="reportnavbar">
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <a class="navbar-brand" href="#">Reports</a>
                                    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                        <li class="nav-item"><a class="nav-link" href="#" data-toggle="modal" data-target="#filterModal">Filter <span class="sr-only">(current)</span></a></li>
                                        <li class="nav-item"><a class="nav-link" href="#" data-toggle="modal" data-target="#addClock">Add Record(s)</a></li>
                                        </ul>
                                         <div id="quickSearchs">
                                            
                                            
                                            <div class="row">
                                                <div class="col-sm-2">
                                                    <h5 id="quicksearch">Quick Search</h5>
                                                </div>
                                                <div class="col-sm-4">
                                                <form method="get" action="javascript:quicksearchReports()">
                                                    <input type="text" id="quickstart" class="form-control .align-middle" name="poststart" placeholder="Start Date">  
                                                </div>
                                                <div class="col-sm-4">
                                                    <input type="text" id="quickend" class="form-control .align-middle" name="postend" placeholder="End Date">
                                                </div>
                                                <div class="col-sm-2">
                                                <button type="submit" class="btn btn-outline-dark" id="quicksearchy">Search</button>
                                                </form>
                                                </div>
                                            </div>                                            
                                         </div>
                                        <form class="form-inline my-2 my-lg-0">
                                        <input class="form-control mr-sm-2" type="search" placeholder="Search By Name" aria-label="Search" id="reportsearch">
                                        </form>
                                    </div>
                            </nav>
                            <!--CLOCK HISTORY TABLE-->
                        <div class="table-responsive-md reptable">
                            <table class="table table-fixed">
                                <thead class="table-fixed-dark" id="reporttableheader">
                                    <th class="col-md-4">Status</th>
                                    <th class="col-md-4">Timestamp</th>
                                    <th class="col-md-4">Action</th>
                                </thead>
                                <tbody id="reporttablebody">

                                </tbody>
                            </table>
                            <!-- REPORTS PAGINATOR -->
                                    <ul class="pagination justify-content-end flex-wrap">
                                        <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                        </li>
                                    </ul>
                        </div>
                        </div>
                        
                            </div>
                            <!-- /#page-content-wrapper -->

                        </div>
                        <!-- /#wrapper -->
<!-- REPORTS FILTER Modal -->
<div class="modal fade" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Select Date Range</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
                    <div class="input-append date">
                        Starting Date: <input type="datepicker" id="datetimepicker1"></input>
                        <span class="add-on"><i data-time-icon="icon-time" data-date-icon="icon-calendar"></i></span>
                    </div>
                <label for="payInt" class="col-sm-12 col-form-label nopads" id="half">Interval:</label>
                    <div class="col-sm-6 nopads" id="payIntervals">
                    <select class="form-control" id="payInt">
                    <option>Bi-Weekly</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    </select>
                    </div>
                    <label for="overtimelimit" class="nopads col-form-label">OT Limit:</label>
                    <div class="col-sm-6 nopads" id="payPeriods">
                    <input class="form-control" type="int" id="overtimelimit">
                    </select>
                    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Generate a Report</button>
      </div>
    </div>
  </div>
</div>
<!--ADD MANAGER Modal -->
    <div class="modal fade" id="addManager" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Manager</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form method="post" action="/timeclock/timeclock/PHP-folder/create_users_manager/register_manager_data.php">
                <div class="form-group row">
                    <label for="addmname" class="col-sm-2 col-form-label">Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="addmname" placeholder="Name">
                    </div>

                    <label for="addmemail" class="col-sm-2 col-form-label">Email: </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="addmemail" placeholder="Email">
                    </div>

                    <label for="inputmPassword" class="col-sm-2 col-form-label">Password:</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" name="inputmPassword" placeholder="Password">
                    </div>
                    <label for="isManager" class="col-sm-2 col-form-label">Manager: </label>
                    <div class="col-sm-10">
                    <select class="form-control" name="isManager">
                    <option>Yes</option>
                    <option>No</option>
                    </select>
                    </div>
                </div>
                
            </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" name="register">Add Manager</button>
            </form>
        </div>
        </div>
    </div>
    </div>
<!--ADD EMPLOYEE Modal -->
    <div class="modal fade" id="addEmployee" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Employee</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form method="post" action="/timeclock/timeclock/PHP-folder/create_users_manager/register_user_data.php">
                <div class="form-group row">
                    <input id= "addeidchange"  type="hidden" name="id" readonly/>

                    <label for="addename" class="col-sm-2 col-form-label">Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="addename" placeholder="Name">
                    </div>

                    <label for="addepin" class="col-sm-2 col-form-label">PIN:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="addepin" placeholder="PIN">
                    </div>

                    <label for="addeemail" class="col-sm-2 col-form-label">Email: </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="addeemail" placeholder="Email">
                    </div>

                    <label for="addedept" class="col-sm-2 col-form-label">Dept:</label>
                    <div class="col-sm-10">
                        <input type="int" class="form-control" name="addedept" placeholder="Dept">
                    </div>

                    <label for="addewage" class="col-sm-2 col-form-label">Wage:</label>
                    <div class="col-sm-10">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                        <input type="int" class="form-control" name="addewage" placeholder="Wage">
                        </div>
                    </div>

                    <label for="addeot_wage" class="col-sm-2 col-form-label">OTWage:</label>
                    <div class="col-sm-10">
                        <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                        <input type="int" class="form-control" name="addeot_wage" placeholder="OT Wage">
                        </div>
                    </div>
                </div>
                
            </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" name="register">Add Employee</button>
            </form>
        </div>
        </div>
    </div>
    </div>
<!--EDIT EMPLOYEE Modal -->
    <div class="modal fade" id="editEmployee" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false">
    <div class="modal-dialog modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit Employee</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form method="post" action="/timeclock/timeclock/PHP-folder/tables/employee_table/edit/edit_data.php">
                <div class="form-group row">
                    <input type="hidden" name="id" id="idchange"readonly/>

                    <label for="editename" class="col-sm-2 col-form-label">Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="editename" placeholder="Name" id="namechange">
                    </div>

                    <label for="editepin" class="col-sm-2 col-form-label" >PIN:</label>
                    <div class="col-sm-10">
                        <input type="int" class="form-control" name="editepin" placeholder="PIN" id="pinchange">
                    </div>

                    <label for="editeemail" class="col-sm-2 col-form-label">Email: </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="editeemail" placeholder="Email" id="emailchange">
                    </div>

                    <label for="editedept" class="col-sm-2 col-form-label">Dept:</label>
                    <div class="col-sm-10">
                        <input type="int" class="form-control" name="editedept" placeholder="Dept" id="deptchange">
                    </div>

                    <label for="editewage" class="col-sm-2 col-form-label">Wage:</label>
                    <div class="col-sm-10">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                        <input type="int" class="form-control" name="editewage" placeholder="Wage" id="wagechange">
                        </div>
                    </div>

                    <label for="editeot_wage" class="col-sm-2 col-form-label">OTWage:</label>
                    <div class="col-sm-10">
                        <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                        <input type="int" class="form-control" name="editeot_wage" placeholder="OT Wage" id="wage_otchange">
                        </div>
                    </div>
                </div>
                
            </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" name="save">Save changes</button>
            </form>
        </div>
        </div>
    </div>
    </div>
<!-- CLOCK IN Modal -->
<div class="modal fade" id="clockIn" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content moveleft">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Clock In</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
            <div class="form-group row">
                <label for="pin" class="col-sm-2 col-form-label">PIN:</label>
                <div class="col-sm-10">
                <input type="int" class="form-control" id="inpin" placeholder="###">
                </div>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Clock In</button>
      </div>
    </div>
  </div>
</div>
<!-- CLOCK OUT Modal -->
<div class="modal fade" id="clockOut" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content moveleft">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Clock Out</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
            <div class="form-group row">
                <label for="pin" class="col-sm-2 col-form-label">PIN:</label>
                <div class="col-sm-10">
                <input type="int" class="form-control" id="outpin" placeholder="###">
                </div>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Clock Out</button>
      </div>
    </div>
  </div>
</div>
<!--ADD CLOCK Modal -->
<div class="modal fade" id="addClock" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Records</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form method="post" action="/timeclock/timeclock/PHP-folder/clockin_clockout/time_fix.php">
                <div class="form-group row">
                    <label for="pin" class="col-sm-2 col-form-label">PIN:</label>
                    <div class="col-sm-10">
                        <input type="int" class="form-control" name="pin" placeholder="###">
                    </div>

                    <label for="date" class="col-sm-2 col-form-label">Date:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="date" placeholder="Date" id="newclockdate">
                    </div>

                    <label for="time" class="col-sm-2 col-form-label">Time:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="time" placeholder="Time" id="newclocktime">
                 </div>

                    <!-- <label for="note" class="col-sm-2 col-form-label">Note:</label>
                    <div class="col-sm-12">
                        <input type="textarea" class="form-control" name="note" placeholder="Note...">
                    </div> -->
                </div>
                <button type="submit" class="form-group btn btn-success" name="clockin" id="clockinbtn">Clock In</button>
            <button type="submit" class="form-group btn btn-danger" name="clockout" id="clockoutbtn">Clock Out</button>
            </form>
            </div>
        </div>
    </div>
    </div>



</div> <!--everything-->
<!-- Latest compiled and minified JavaScript -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<!-- date pickers -->
<script src="https://cdn.jsdelivr.net/npm/gijgo@1.9.6/js/gijgo.min.js" type="text/javascript"></script>
<script src="index.js"></script>
</body>
</html>