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

//print_r($_GET);print_r($_POST);die;

extract($_POST);

if(validateData($_POST)){

$id=$_GET['id'];
$sql = "UPDATE tbl_info set person_name='$person_name', business_name='$business_name', business_gst_number='$business_gst_number' where id=$id"; 
$result = mysqli_query($con,$sql) or die(mysqli_error($con));

$data['error']=0;
$data['message']="Data updated successfully";
echo json_encode($data);die;
}else{
    $data['errors']=$_GET['error'];
	$data['count']=1;
	unset($_GET['error']);
    echo json_encode($data);
}

function validateData(){
	$flag=1;
    if(empty($_POST['person_name'])){
        $_GET['error']['person_name']="Please enter the persone name";
        $flag=0;
    }

    if(empty($_POST['business_name'])){
        $_GET['error']['business_name']="Please enter the business name";
        $flag=0;
    }

    if(empty($_POST['business_gst_number'])){
        $_GET['error']['business_gst_number']="Please enter the business gst number";
        $flag=0;
    }
    
    if($flag){
       return true;
    }else{
        return false;
    }
}
?>