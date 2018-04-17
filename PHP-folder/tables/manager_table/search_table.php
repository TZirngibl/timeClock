<?php
$connect = mysqli_connect("localhost", "root", "", "project1");
$arr = [];
if(isset($_POST["query"]))
{
	$search = mysqli_real_escape_string($connect, $_POST["query"]);
	$query = "
	SELECT * FROM manager 
	WHERE name LIKE '%".$search."%' 
	";
}
else
{
	$query = "
	SELECT * FROM manager ORDER BY name";
}
$result = mysqli_query($connect, $query);
if(mysqli_num_rows($result) > 0)
{

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