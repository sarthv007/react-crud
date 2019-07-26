<?php
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');
//print_r($_POST);die;
$host = "localhost"; 
$user = "root"; 
$password = "root"; 
$dbname = "reactdb"; 
$con = mysqli_connect($host, $user, $password,$dbname);

extract($_POST);

//print_r($_GET);die;
$id=$_GET['id'];
$sql = "DELETE from tbl_info where id=$id"; 
$result = mysqli_query($con,$sql) or die(mysqli_error($con));


$data['error']=0;
$data['message']="Data Deleted successfully";
echo json_encode($data);die;

?>