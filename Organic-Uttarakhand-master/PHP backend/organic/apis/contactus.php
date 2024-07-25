<?php
    require_once '../lib/core.php';


    //api for inserting a contactus description
    if(isset($_POST['insert_contactus_info'])){
        $name = $_POST['name']; 
        $description = $_POST['description'];
        $subject = $_POST['subject']; 
        $number = $_POST['number'];
        $email = $_POST['email']; 
        $sql = "insert into contactus (name,description,subject,phone,email) values ('$name','$description','$subject','$number','$email')";
        if ($conn->query($sql)){
            $seat['msg']='success';
            echo json_encode($seat);
        }
        else
        {
            echo $conn->error;
        }
    }


    

 
   

    

?>