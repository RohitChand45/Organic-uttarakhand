<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

//opne server error
ini_set('display_errors', 1);
error_reporting(1);

//select time zone
date_default_timezone_set('Asia/Kolkata');

//for the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "organic";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);


// Check connection
if($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}


//website link
//  $website_link = "http://localhost/cyberflow_admin"; 

//  server base url
 $SERVER_BASE_URL = "http://localhost/organic/";
  

//  $admin_id = 6;

//  $sql="select * from web_config where admin_id='$admin_id'";
//  if($res=$conn->query($sql)){
//      if($res->num_rows){
//          $OFFICE_DETAILS= $res->fetch_assoc();
        
//      }
//      else
//      {
//          return false;
//      }
//  }

?>