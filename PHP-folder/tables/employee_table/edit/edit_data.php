<?php
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    $control = $_SESSION["nameofuser"];
    if(isset($_POST['save'])){
        $id = $_POST['id'];
/////////////////////////////////////Update Name//////////////////////////////////////////
        if(isset($_POST['editename'])){
            $name = $_POST['editename'];
            $sql = "UPDATE employee SET name='$name' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
/////////////////////////////////////Update Email//////////////////////////////////////////
        if(isset($_POST['editepin'])){
            $pin = $_POST['editepin'];
            $sql = "UPDATE employee SET pin='$pin' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
/////////////////////////////////////Update Pin////////////////////////////////////////////        
        if(isset($_POST['editeemail'])){
            $email = $_POST['editeemail'];
            $sql = "UPDATE employee SET email='$email' WHERE id='$id'";
            mysqli_query($db, $sql);
        }
//////////////////////////////Department change//////////////////////////////////////////
    if(isset($_POST['editedept'])){
        $dept = $_POST['editedept'];
        $sql = "UPDATE employee SET dept='$dept' WHERE id='$id'";
        mysqli_query($db, $sql);
    }

////////////////////////////////////Wage Change//////////////////////////////////////////    
    if(isset($_POST['editewage'])){
        $wage = $_POST['editewage'];
        $sql = "UPDATE employee SET wage='$wage' WHERE id='$id'";
        mysqli_query($db, $sql);
    }

////////////////////////////////////overtime Wage Change//////////////////////////////////////////    
    if(isset($_POST['editeot_wage'])){
        $wage_ot = $_POST['editeot_wage'];
        $sql = "UPDATE employee SET wage_ot='$wage_ot' WHERE id='$id'";
        mysqli_query($db, $sql);
    }
////////////////////////////////////Last Modify//////////////////////////////////////////
    $sql = "UPDATE employee SET lastmodify_date=DATE.NOW(), lastmodify_by='$control' WHERE id='$id'";
    mysqli_query($db, $sql);
        header("location:../../../../index.php");
    }
?>