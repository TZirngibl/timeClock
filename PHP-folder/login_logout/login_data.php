<?php
    session_start();
    $db = mysqli_connect("localhost","root","","project1");
    if(isset($_POST['login'])){
        $email = $_POST['email'];
        $pass = $_POST['pass'];
        $sql = "SELECT * FROM manager WHERE email='$email'";
        $result = $db-> query($sql);
        if($result-> num_rows > 0){
                while($row = $result-> fetch_assoc()){
                    if(password_verify($pass, $row['pass'])){
                        if($row["level"] == 'm'){
                            $_SESSION["nameofuser"] = $row["name"];
                            $_SESSION['login'] = true;
                            header("location:/timeclock/timeclock/index.php");
                        }
                        else
                        {
                            $_SESSION['errors'] = "You Are Not Admin";
                            header("location:login.php");
                        }
                    }
                    else
                    {
                        $_SESSION['errors'] = "Incorrect Username or Password";
                        header("location:login.php");
                    }
                }
            }
        else
        {
            $_SESSION['errors'] = "Incorrect Username or Password";
            header("location:/timeclock/timeclock/index.php");
        }
    }
?>