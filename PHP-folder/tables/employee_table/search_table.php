<?php
$connect = mysqli_connect("localhost", "root", "", "project1");
$arr = [];
if(isset($_POST["query"]))
{
	// get the search key then search for the employee with their name similiar to the search key
	$search = mysqli_real_escape_string($connect, $_POST["query"]);
	$query = "
	SELECT * FROM employee 
	WHERE name LIKE '%".$search."%' 
	LIMIT 5";
}
else
{
	// if the search key is null then get all the employees
	$query = "
	SELECT * FROM employee ORDER BY name";
}
$result = mysqli_query($connect, $query);
if(mysqli_num_rows($result) > 0)
{
	// put to array
	while($row = mysqli_fetch_array($result))
	{
		array_push($arr,$row);
	}
	echo json_encode($arr);
}
else
{
	echo 'Data Not Found';
}
?>