<?php
    require_once '../lib/core.php';

    //api for showing all shop item details
    if (isset($_POST['fetch_shop_details'])){
        $sql="select * from shop  order by rand()";
        if($res=$conn->query($sql))
        {
            if($res->num_rows)
            { 
                while($data= $res->fetch_assoc())
                {
                    $response['data'][]=$data;
                }  
                $response['msg']='success';  
            }
        }
        else
        {  
            $response['msg']='error';
            $response['error']=$conn->error;
            $respones['query']=$sql;
        }

        echo json_encode($response); 
    }

    //api for showing 4 shop item details in home page
    if (isset($_POST['fetch_limit_ShopItems'])){
        $sql="select * from shop order by rand() limit 4 ";
        if($res=$conn->query($sql))
        {
            if($res->num_rows)
            { 
                while($data= $res->fetch_assoc())
                {
                    $response['data'][]=$data;
                }  
                $response['msg']='success';  
            }
        }
        else
        {  
            $response['msg']='error';
            $response['error']=$conn->error;
            $respones['query']=$sql;
        }
        echo json_encode($response); 
    }



    //api for inserting a new item in a shop
    if(isset($_POST['insert_new_shopItem'])){
        $name = $_POST['name']; 
        $description = $_POST['description'];
        $category = $_POST['category']; 
        $price = $_POST['price'];
        $image = $_POST['image']; 
        $distributor = $_POST['distributor'];
        $sql = "insert into shop (name,description,category,price,image,distributor) values ('$name','$description','$category','$price','$image','$distributor')";
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