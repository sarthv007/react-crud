<?php
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');
//print_r($_POST);die;
$host = "localhost"; 
$user = "root"; 
$password = "root"; 
$dbname = "reactdb"; 
$id = '';
$con = mysqli_connect($host, $user, $password,$dbname);
//print_r($_POST);die;
extract($_POST);

if(validateData($_POST)){


$sql = "insert into tbl_info (person_name, business_name, business_gst_number) values ('$person_name', '$business_name', '$business_gst_number')"; 

$result = mysqli_query($con,$sql) or die(mysqli_error($con));


$sql="select *from tbl_info";
$result = mysqli_query($con,$sql) or die(mysqli_error($con));

$data=array();$i=0;
while($row=mysqli_fetch_assoc($result)){
	$data[$i]['id']=$row['id'];
	$data[$i]['person_name']=$row['person_name'];
	$data[$i]['business_name']=$row['business_name'];
	$data[$i]['business_gst_number']=$row['business_gst_number'];
	$i++;
}
$data['error']=0;
$data['message']="Data inserted successfully";
echo json_encode($data);die;
}else{
	$data=$_GET;
	$data['error']=1;
	unset($_GET);
	echo json_encode($data);
}

function validateData(){
	$flag=1;
    if(empty($_POST['person_name'])){
        $_GET['person_name']="Please enter the persone name";
        $flag=0;
    }

    if(empty($_POST['business_name'])){
        $_GET['business_name']="Please enter the business name";
        $flag=0;
    }

    if(empty($_POST['business_gst_number'])){
        $_GET['business_gst_number']="Please enter the business gst number";
        $flag=0;
    }

    
    
    if($flag){
       return true;
    }else{
        return false;
    }
}
?>