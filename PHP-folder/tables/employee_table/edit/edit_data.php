<?php
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    $control = $_SESSION["nameofuser"];
    if(isset($_POST['save'])){
        $id = $_POST['id'];
/////////////////////////////////////Update Name//////////////////////////////////////////
        if(isset($_POST['newname'])){
            $name = $_POST['newname'];
            $sql = "UPDATE employee SET name='$name' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
        if(empty($_POST['newname'])){
            $name = $_POST['oldname'];
            $sql = "UPDATE employee SET name='$name' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
/////////////////////////////////////Update Email//////////////////////////////////////////
        if(isset($_POST['newpin'])){
            $pin = $_POST['newpin'];
            $sql = "UPDATE employee SET pin='$pin' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
        if(empty($_POST['newpin'])){
            $pin = $_POST['oldpin'];
            $sql = "UPDATE employee SET pin='$pin' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
/////////////////////////////////////Update Pin////////////////////////////////////////////        
        if(isset($_POST['newemail'])){
            $email = $_POST['newemail'];
            $sql = "UPDATE employee SET email='$email' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
        if(empty($_POST['newemail'])){
            $email = $_POST['oldemail'];
            $sql = "UPDATE employee SET email='$email' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
//////////////////////////////Department change//////////////////////////////////////////
    if(isset($_POST['newdept'])){
        $dept = $_POST['newdept'];
        $sql = "UPDATE employee SET dept='$dept' WHERE id='$id'";
        mysqli_query($db, $sql);
    }
    if(empty($_POST['newdept'])){
        $dept = $_POST['olddept'];
        $sql = "UPDATE employee SET dept='$dept' WHERE id='$id'";
        mysqli_query($db, $sql);
    }
////////////////////////////////////Wage Change//////////////////////////////////////////    
    if(isset($_POST['newwage'])){
        $wage = $_POST['newwage'];
        $sql = "UPDATE employee SET wage='$wage' WHERE id='$id'";
        mysqli_query($db, $sql);
    }
    if(empty($_POST['newwage'])){
        $wage = $_POST['oldwage'];
        $sql = "UPDATE employee SET wage='$wage' WHERE id='$id'";
        mysqli_query($db, $sql);
    }
////////////////////////////////////overtime Wage Change//////////////////////////////////////////    
    if(isset($_POST['newwage_ot'])){
        $wage_ot = $_POST['newwage_ot'];
        $sql = "UPDATE employee SET wage_ot='$wage_ot' WHERE id='$id'";
        mysqli_query($db, $sql);
    }
    if(empty($_POST['newwage_ot'])){
        $wage_ot = $_POST['oldwage_ot'];
        $sql = "UPDATE employee SET wage_ot='$wage_ot' WHERE id='$id'";
        mysqli_query($db, $sql);
    }
////////////////////////////////////Last Modify//////////////////////////////////////////
    $sql = "UPDATE employee SET lastmodify_date=NOW(), lastmodify_by='$control' WHERE id='$id'";
    mysqli_query($db, $sql);
        header("location:../../../../home.php");
    }
?>