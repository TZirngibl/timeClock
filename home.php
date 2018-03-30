<?php
    session_start();
    if($_SESSION['login'] == FALSE){
        header("location:login-logout/login.php");
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
    <link rel="stylesheet" type="text/css" media="screen" href="CSS-folder/button.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="CSS-folder/home.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="CSS-folder/table.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="CSS-folder/register.css" />
    
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
                <li><button class="button6" type="button" id="managers">Home</button></li>
                <li><button class="button6" type="button" id="createuser">Create New Employee</button></li>
                <li><button class="button6" type="button" id="createmanager">Create New Manager</button></li>
                <li><button class="button6" type="button" id="money">Money</button></li>
                <li><button class="button6" type="button" id="clockinbtn">Clock In</button></li>
                <li><button class="button6" type="button" id="clockoutbtn">Clock Out</button></li>
                <form method="post" action="Login-Logout/logout.php" class="logout">
                <li><button class="button6 out" type="submit" name="login" value="login">Logout</button></li>
                </form>
            </ul>
        </div>
        <div class="container">
        <div class="table-manager">
            <div class="search-container">
				<div class="search-input">
                    <div class="searchicon"></div>
                <input type="text" name="search_text" id="search_text" placeholder=" Search Employees by Name" class="form-control" />
                </div>
            </div>
            <div>
            <table id="yatable">            
                <tbody class="result">
                </tbody>
            </table>
            </div><!--yatable-->
</div>
</div>
</div>

</body>
<!-- The Modal -->
<div class="modal_container" id="managermodal_container">
                <div class="modal">
                    <p id="registerform">Create  New  Manager</p>
                        <form method="post" action="registermanagerdata.php" class="register-form">
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
                        <form method="post" action="registeruserdata.php" class="register-form">
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
            <form method="post" action="editdata.php" class="editusertext">
                <input id= "idchange"           type="hidden"       name="id" readonly/>
                
                
                
                <input id= "passchange"         type="hidden"       name="oldpass" readonly/>
                <input id= "createdatechange"   type="hidden"         name="oldcreatedate" readonly/>
                <input id= "createbychange"     type="hidden"         name="oldcreateby" readonly/></br>

                Current Name:<input id= "namechange"         type="text"         name="oldname" readonly/> <br/>New Name:<input                          type="text"         name="newname"      placeholder="Name"/>
                Current E-mail:<input id= "emailchange"        type="text"         name="oldemail" readonly/><br/>New E-mail:<input                          type="text"         name="newemail"     placeholder="E-mail Address"/>
                Current Level:<input id= "levelchange"        type="text"         name="oldlevel" readonly/><br/>New Level(m/u):<input                          type="checkbox"     name="newlevel"     value="manager" class="checkmark"></label>
                New Password:<input                          type="Password"     name="newpass"      placeholder="Password"/>
                Confirm New Password:<input                          type="Password"     name="newpass2"     placeholder="Confirm Your Password"/>
                <input id="save"                type="submit"       name="save"         value="Save Changes"/> 
            </form>
        <span class="close2" href="#">X</span>
    </div>
</div>
<!-- Clock In Modal -->
<div class="modal_container" id="clockinmodal_container">
    <div class="modal">
        <p id="registerform">Clock In</p>
            <form method="post" action="clockin.php" class="register-form">
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
            <form method="post" action="clockout.php" class="register-form">
                <label for="pin">PIN:<input type="" name="pin" placeholder="###"/>
                <input id="clockout" type="submit" name="clockout" value="Clock Out"/> 
            </form>
        <span class="close5" href="#">X</span>
    </div>
</div>
</html>
<script src="JS-folder/home.js"></script>
<script src="JS-folder/completetable.js"></script>