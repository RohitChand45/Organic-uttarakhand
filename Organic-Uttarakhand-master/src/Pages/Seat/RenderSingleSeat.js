import React, { useState, useEffect } from 'react'
// import {deleteCategory, editCategory} from '../../api/institute'
import Snackbar from '@material-ui/core/Snackbar';

export default function RenderSingleSeat(props) {
    const {row,index,deleteseat}=props
    const[icon, setIcon] = useState("")
    const [Categoryname, setCategoryname] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)



    const deleteCategoryCallback=(response,index) =>{
        if(response.status==200){
            console.log('category has been deleted')
            deleteseat(index)
            setSnackBarMessage("Category Deleted Successfully")
            setIsSnackBarShow(true)
        } else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log('Ooops! Something went wrong while deleting!')
        }
    }


    const action4DeleteCategory=(id, label, index)=>{
        
        if(window.confirm('Deleting?  '+ label)){
           
            // deleteCategory(id, (response)=>deleteCategoryCallback(response,index))
            // delele function
            
        } else{
            console.log('cancel mission del')
        }

    }


    const editCallback=(response)=>{
        if(response.status==200){
            response.json().then(data=>{
                console.log('response after updated', data)
            })
        }
    }


    const actionEdit4Category=(id,)=>{
        if(window.confirm('Are you sure to Save Changes')){
           
            // editCategory(id, icon, Categoryname, sortOrder, editCallback)
            // edit function
            
            setSnackBarMessage("Institute Category Details Successfully")
            setIsSnackBarShow(true)
            
        } else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log('cancel mission del')
        }
    }

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }
    
    return (
        <>
            <tr>
                <td align="center">{props.index+1}</td>
                <td align="center">{row.s_no}</td>
                <td align="center">{row.seat_number}</td>
                <td align="center">
                    <button className="btn btn-danger m-1" onClick={()=> deleteseat(row.s_no,index)}> Delete </button>
                </td>
            </tr>

            <Snackbar
                    open={isSnackBarShow}
                    onClose={(e)=>closeSnack(e)}
                    TransitionComponent="TransitionUp"
                    message={SnackBarMessage}
            />
        </>
    )
}
