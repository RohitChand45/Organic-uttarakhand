<?php
    require_once '../lib/core.php';

    //api for showing shop item in Cart
    if (isset($_POST['fetch_cart'])){
        $sql="select * from shop where cart_status=1 order by rand()";
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


    //api for getting total cost of cart
    if (isset($_POST['total_cart_cost'])){
        $sql="select sum(price) from shop where cart_status=1";
        if($res=$conn->query($sql))
        {
            if($res->num_rows)
            { 
                $data= $res->fetch_assoc();
                $response['data']=$data;
                $response['msg']='success';  
            }
            else
            {
                return false;
            }
        }
        else
        {  
            $response['msg']='error';
            $response['error']=$conn->error;
            $response['query']=$sql;
        }

        echo json_encode($response); 
    }


    //api for moving item to cart
    if (isset($_POST['insert_cart'])){
        $item_id = $_POST['item_id'];
        
        $sql="update shop set cart_status=1 where id='$item_id' ";
        if ($conn->query($sql))
        {
            $sql="update shop set wishlist_status=0 where id='$item_id' ";
            $seat['msg']='success';
            echo json_encode($seat);
        } 
        else
        {
            echo $conn->error;
        }
    }



    //api for removing item from cart
    if (isset($_POST['remove_wishlist'])){
        $item_id = $_POST['item_id'];
        
        $sql="update shop set cart_status=0 where id='$item_id' ";
        if ($conn->query($sql))
        {
            $seat['msg']='success';
            echo json_encode($seat);
        } 
        else
        {
            echo $conn->error;
        }
    }


    //api to check if item is in cart
    // if (isset($_POST['check_cart_status'])){
    //     $item_id = $_POST['item_id'];
        
    //     $sql="select cart_status from where id='$item_id' ";
    //     if ($conn->query($sql))
    //     {
    //         $seat['msg']='success';
    //         echo json_encode($seat);
    //     } 
    //     else
    //     {
    //         echo $conn->error;
    //     }
    // }
?>