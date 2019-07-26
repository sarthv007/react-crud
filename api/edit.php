<?php
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
//print_r($_POST);die;
$host = "localhost"; 
$user = "root"; 
$password = "root"; 
$dbname = "reactdb"; 

$con = mysqli_connect($host, $user, $password,$dbname);
//print_r($_POST);die;
$sql="select *from tbl_info where id=$_GET[id]";
$result = mysqli_query($con,$sql) or die(mysqli_error($con));

$data=array();$i=0;
while($row=mysqli_fetch_assoc($result)){
	$data['id']=$row['id'];
	$data['person_name']=$row['person_name'];
	$data['business_name']=$row['business_name'];
	$data['business_gst_number']=$row['business_gst_number'];
	$i++;
}
echo json_encode($data);die;

?>