<?php
session_start();
require_once 'config.php';

//login admin
function login($name,$password,$conn)
{
    $sql="select * from admin where name='$name' and password='$password'";
    $res=$conn->query($sql);
    if($res->num_rows>0)
    {
        $row=$res->fetch_assoc();
        $id=$row['s_no'];
        
        $_SESSION['admin_signed_in']=$name;
        $_SESSION['id']=$id;
        return $row;
    }
    else
    {
        return false;
    }
}


//login employee
function login_employee($email,$password,$conn)
{
    $sql="select id from admin where email='$email' and password='$password' and status= 1";
    $res=$conn->query($sql);
    if($res->num_rows>0)
    {
        $row=$res->fetch_assoc();
        $id=$row['id'];
        $eid=$row['e_id'];
        header("location: ../employee/projects.php");
        $_SESSION['employee_signed_in']=$email;
        $_SESSION['id']=$id;
        $_SESSION['e_id']=$eid;
    }
    else
    {
        return false;
    }
}

//admin_auth
function admin_auth()
{
    if(isset($_SESSION['admin_signed_in']))
    {
        return true;
    }
    else
    {
        return false;
    }
} 

//employee_auth
function employee_auth()
{
    if(isset($_SESSION['employee_signed_in']))
    {
        return true;
    }
    else
    {
        return false;
    }
}

//admin_in password change
function password_change($newPass,$curPass,$conn)
{
    $email=$_SESSION['admin_signed_in'];
    $sql="select password from users where email='$email' and password='$curPass'";
    $res=$conn->query($sql);
    if($res->num_rows>0)
    {
        $sql="update users set password='$newPass' where email='$email'";
        if($conn->query($sql))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

//single image upload

function upload_imageUpdate($conn,$table,$column,$id_columnka_naam,$id,$image)
{
    $uploadedFile = 'err';
    // print_r($_FILES);
    if(!empty($_FILES[$image]["type"]))
    {
        $fileName = time().'_'.str_replace(' ', '',$_FILES[$image]['name']);
        $valid_extensions = array("jpeg", "jpg", "png","bmp","JPG");
        $temporary = explode(".", $_FILES[$image]["name"]);
        $file_extension = end($temporary);
        
        if((($_FILES[$image]["type"] == "image/png") || ($_FILES[$image]["type"] == "image/bmp") || ($_FILES[$image]["type"] == "image/jpg") || ($_FILES[$image]["type"] == "image/JPG") || ($_FILES[$image]["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions))
        {
            $sourcePath = $_FILES[$image]['tmp_name'];
             $targetPath = "uploads/".$fileName;
            if(move_uploaded_file($sourcePath,$targetPath))
            {
                $uploadedFile = $fileName;
                if(isset($table))
                {
                     $sql="update $table set $column='apis/$targetPath' where $id_columnka_naam=$id";
                    if($conn->query($sql)===true)
                    {
                        return 'apis/'.$targetPath;
                    }
                    else
                    {
                        // echo $fileName;
                        unlink("uploads/".$fileName);
                        return 'err';
                    }
                }
                return $uploadedFile;
            }
            else
            {
                $uploadedFile="err";
                 return $uploadedFile;
            }
        }
        else
        { 
            $uploadedFile="err";
            return $uploadedFile;
        }
       
    }
    else
    {
            $uploadedFile="err";
            return $uploadedFile;
    }
}


//upload
function upload_imagesInsert($conn,$table,$id_col,$column,$id,$images)
{
    // print_r($_FILES);
	if(isset($_FILES[$images]))
    {
        $extension=array("jpeg","jpg","png","gif","pdf","PDF","JPG");
        foreach($_FILES[$images]["tmp_name"] as $key=>$tmp_name) 
        {
            $file_name=$_FILES[$images]["name"][$key];
            $file_tmp=$_FILES[$images]["tmp_name"][$key];
              $ext=pathinfo($file_name,PATHINFO_EXTENSION); 
            if(in_array(strtolower($ext),$extension)) 
            {
                $filename=basename($file_name,$ext);
                $newFileName=$filename.time().".".$ext;
                if(move_uploaded_file($file_tmp=$_FILES[$images]["tmp_name"][$key],"uploads/".$newFileName))
                {
                      $sql="insert into $table($id_col, $column) values($id,'$newFileName')";
                      $conn->query($sql);
                    if($conn->query($sql)===true)
                    {
                        $status=true;
                    }
                    else
                    {
                        $status=false;
                        break;
                    }
                }
                else
        
                {
                    $status=false;
                    break;
                }
            }
            else 
            {
                array_push($error,"$file_name, ");
            }
        }
        return $status;
    }
}


//velidation for input type
function test_input($data) 
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}




//function for making student is card
function student_id_card($name,$f_name,$student_id,$start_time,$end_time,$mobile_no,$seat_no,$locker_no,$profile,$logo,$library_mobile,$library_name,$address,$sign_stamp,$filePath){
    $pdf = new FPDF();
    $pdf->AddPage();

    $pdf->SetFont('Arial','B',12);
    $pdf->SetTextColor(194,8,8);
    $pdf->Cell(30,10,'Office No ',0,0);
    $pdf->Cell(45,10,": $library_mobile",0,0);
    $pdf->Cell(65,10,'',0,0);
    $pdf->Cell(30,10,'Enroll No ',0,0);
    $pdf->Cell(20,10,": $student_id",0,1);

    $pdf->Image("$logo",55,22,10,10);
    $pdf->SetFont('Times','B',14);
    $pdf->SetTextColor(0,0,0);
    $pdf->Cell(190,15,"$library_name",0,1,'C');

    $pdf->SetXY(10,33);
    $pdf->SetTextColor(0,0,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(190,10,"$address",0,1,'C');

    $pdf->SetXY(10,45);
    $pdf->Cell(70,10,'',0,0);
    $pdf->SetFont('Arial','B',16);
    $pdf->SetTextColor(194,8,8);
    $pdf->Cell(50,10,'IDENTITY CARD',0,0);
    $pdf->Cell(70,10,'',0,1);

    $pdf->SetFont('Arial','B',13);
    $pdf->SetTextColor(0,0,254);
    $pdf->Cell(23,10,'Time Slot',0,0);
    $pdf->Cell(47,10,":  $start_time - $end_time",0,0);

    $pdf->SetXY(10,69);
    $pdf->SetFont('Arial','B',12);
    $pdf->SetTextColor(0,0,0);
    $pdf->Cell(50,10,'Name',0,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(50,10,": $name",0,1);

    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(50,10,'Father Name',0,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(50,10,": $f_name",0,1);

    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(50,10,'Mobile Number',0,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(50,10,": $mobile_no",0,1);

    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(50,10,'Seat Number',0,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(50,10,": $seat_no",0,1);

    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(50,10,'Locker Number',0,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(50,10,": $locker_no",0,1);

    $pdf->Image("$profile",160,77,40,41);
    $pdf->Image("$sign_stamp",110,87,30,30);

    // $pdf->Line(155,95,195,95);
    // $pdf->Ln(10);
    // $pdf->Cell(140,5,'',0,0);
    // $pdf->Cell(50,5,' Signature poooooo',0,1,'C');
    $pdf->Output("F",$filePath);
}


//function for fee recipt
function fee_recipt($name,$f_name,$student_id,$logo,$library_mobile,$library_name,$address,$months,$s_month,$e_month,$seat_no,$locker_no,$registration_fee,$library_fee,$locker_fee,$total_fee,$paid_stamp,$filePath){
    $pdf = new FPDF();
    $pdf->AddPage();

    $pdf->SetFont('Arial','B',12);
    $pdf->SetTextColor(194,8,8);
    $pdf->Cell(30,10,'Office No ',0,0);
    $pdf->Cell(45,10,": $library_mobile",0,1);

    $pdf->Image("$logo",55,22,10,10);
    $pdf->SetFont('Times','B',14);
    $pdf->Cell(190,15,"$library_name",0,1,'C');

    $pdf->SetTextColor(0,0,0);
    $pdf->SetXY(10,33);
    $pdf->SetTextColor(0,0,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(190,10,"$address",0,1,'C');

    $pdf->SetXY(10,45);
    $pdf->SetFont('Arial','B',12);
    $pdf->SetTextColor(0,0,256);
    $pdf->Cell(30,10,'Enroll No ',0,0);
    $pdf->Cell(20,10,": $student_id",0,1);

    $pdf->SetFont('Arial','B',12);
    $pdf->SetTextColor(0,0,0);
    $pdf->Cell(38,10,'Name',1,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(68,10,": $name",1,0);
    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(38,10,'Father Name',1,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(52,10,": $f_name",1,1);

    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(38,10,'Seat No.',1,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(68,10,": $seat_no",1,0);
    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(38,10,'Locker No.',1,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(52,10,": $locker_no",1,1);

    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(38,10,'Registration Fee',1,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(68,10,": $registration_fee",1,0);
    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(38,10,'Library Fee',1,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(52,10,": $library_fee",1,1);

    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(38,10,'Locker Fee',1,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(68,10,": $locker_fee",1,1);

    $pdf->SetFont('Arial','B',12);
    $pdf->SetTextColor(194,8,8);
    $pdf->Cell(40,10,'For the period of',0,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(10,10,"$months",0,0);
    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(30,10,'months from',0,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(30,10,"$s_month",0,0);
    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(10,10,'to',0,0);
    $pdf->SetFont('Arial','',12);
    $pdf->Cell(30,10,"$e_month",0,1);

    $pdf->Image("$paid_stamp",175,86,30,30);

    $pdf->Ln(5);
    $pdf->SetTextColor(0,0,0);
    $pdf->Cell(120,10,'',0,0);
    $pdf->SetFont('Times','B',12);
    $pdf->Cell(20,10,'Total',0,0,'C');
    $pdf->SetFont('Times','I',16);
    $pdf->Cell(10,10,'Rs',1,0,'C');
    $pdf->SetFont('Times','B',16);
    $pdf->Cell(20,10,"$total_fee",1,0,'C');

    

    $pdf->Output("F",$filePath);
}

?>