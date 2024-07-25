<?php
    require_once '../lib/core.php';

//api for showing shop item in wishlist
    if (isset($_POST['fetch_wishlist'])){
        $sql="select * from shop where wishlist_status=1 order by rand()";
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
            else
            {
                return false;
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



     //api for moving item to wishlist
     if (isset($_POST['insert_wishlist'])){
        $item_id = $_POST['item_id'];
        
        $sql="update shop set wishlist_status=1 where id='$item_id' ";
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



    //api for removing item from whishlist
    if (isset($_POST['remove_wishlist'])){
        $item_id = $_POST['item_id'];
        
        $sql="update shop set wishlist_status=0 where id='$item_id' ";
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
?>