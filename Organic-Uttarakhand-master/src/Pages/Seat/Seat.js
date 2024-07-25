import React, { useState, useEffect } from 'react'
import RenderSingleSeat from './RenderSingleSeat'
// import { fetch_categoriesAll, addCategory } from '../../api/institute'
import { Image, Shimmer } from 'react-shimmer'
import Snackbar from '@material-ui/core/Snackbar';
import { insertSeats,deletemultipleSeats, fetchSeats,deletesingleSeat,lastSeatNumber} from '../../api/seat';
import { useSelector } from 'react-redux';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/modal/modal';

export default function Seat() {


    const adminDetails = useSelector(state=>state.ins.details);
    const [seatData, setSeatData] = useState([]);
    const [offset, setOffset] = useState(0);

    const [icon, setIcon] = useState("")
    const [totalSeats, setTotalSeats] = useState("")
    const [deleteSeats, setDeleteSeats] = useState("")
    const [showShimmer, setShowShimmer] = useState(true)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [isAddModalVisible,setisAddModalVisible]=useState(false)
    const[isDeleteModalVisible,setisDeleteModalVisible]=useState(false)
    const[lastSeatNo,setLastSeatNo]=useState("")

    useEffect(() => {
        fetchSeats(adminDetails.s_no,fetchSeatsCallback)
        
    },[])

    const fetchSeatsCallback=(response)=>
    {
        if(response.msg ==="success")
        {
            setSeatData(response.data)
           
        }
        setShowShimmer(false)
    }

    const lastSeatNoCallback=(response)=>{
        if(response.msg ==="success"){
            setLastSeatNo(response.data)
        }
    }


    const addSeatCallback = (response) => {
        if (response.msg === "success") {
                // setDemo(data)
            fetchSeats(adminDetails.s_no,fetchSeatsCallback)
            setSnackBarMessage("Seats Added Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }

    const addSeatsHanlder = () => {

        if (window.confirm('Are you sure to Add Seats')) {
            lastSeatNumber(adminDetails.s_no,lastSeatNoCallback)
            insertSeats(totalSeats,adminDetails.s_no,addSeatCallback)
            setisAddModalVisible(false);
        } 
        else {
            console.log('cancel mission add seats', totalSeats)
        }
    }



    const deletesingleCallback = (response,index) => {
        if (response.msg === "success") {
            let seat_data_local = [...seatData]
            seat_data_local.splice(index, 1);
            setSeatData(seat_data_local)
            setSnackBarMessage("Seat Deleated Successfully")
            setIsSnackBarShow(true)
        }
        else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }

    const deleteseat = (s_no,index) =>{
        deletesingleSeat(s_no,(response)=>deletesingleCallback(response,index))
    }
    



    const deleteSeatCallback = (deleteSeats,response) => {
        if (response.msg === "success") {
            let seat_data_local = [...seatData]
            seat_data_local.splice(seatData.length-deleteSeats,deleteSeats);
            setSeatData(seat_data_local)
            setSnackBarMessage("Seats Deleated Successfully")
            setIsSnackBarShow(true)
            setisDeleteModalVisible(false)
        }
        else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }

    
    const deleteSeatsHanlder=()=>
    {
        deletemultipleSeats(deleteSeats,(response)=>deleteSeatCallback(deleteSeats,response))
    }

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }
 
    return (
        <>

            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Seat Management</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="ml-auto">
                    <button class="btn btn-primary" onClick={()=>setisAddModalVisible(true)}>Add Seats</button>
                    <button class="btn btn-danger ml-2" onClick={()=>setisDeleteModalVisible(true)}>Delete Multiple Seats</button>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered mb-0" id="table1">
                            <thead class="thead-dark">
                                <tr>
                                    <th align="center">S.No</th>
                                    <th align="center">Seat Id</th>
                                    <th align="center">Seat Number</th>
                                    <th align="center">Delete / Edit</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showShimmer ? (
                                    <td colspan="4">
                                        <Shimmer width={'100%'} height={40} />
                                    </td>
                                ) : (
                                    <>


                                        {(!seatData||(seatData&&seatData.length==0))?(
                                            <p>No data available</p>

                                        ):(

                                            seatData.map((row,i) => (
                                                <RenderSingleSeat row={row} index={i} deleteseat={deleteseat} />
                                            ))
                                        )}
                                    

                                    </>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal 4 add seats */}
            <Modal
                visible={isAddModalVisible} 
                setModalVisible={setisAddModalVisible} 
                modalId={"testAddEditModal"} 
            >
                <form >
                    <ModalHeader>
                        <h5 className="modal-title">Add Seats</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>   
                    <ModalBody> 
                        <h6><label for="totalSeatsLabel">Enter number of seats you want to add</label></h6>
                        <input type="number" id="totalSeatsLabel" class="form-control mt-1" onChange={e => setTotalSeats(e.target.value)} placeholder="Total seats" />
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={() => addSeatsHanlder()}>Add Seats</button>
                    </ModalFooter> 
                 </form>
            </Modal>

            

            {/* Modal 4 delete multiple seats */}
            <Modal
                visible={isDeleteModalVisible} 
                setModalVisible={setisDeleteModalVisible} 
                modalId={"testDeleteEditModal"} 
            >
                <form >
                    <ModalHeader>
                        <h5 className="modal-title">Add Seats</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>   
                    <ModalBody> 
                        <h6><label for="totalSeatsLabel">Enter number of seats you want to delete</label></h6>
                        <input type="number" id="totalSeatsLabel" class="form-control mt-1" onChange={e => setDeleteSeats(e.target.value)} placeholder="Total seats to be deleted" />
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={() => deleteSeatsHanlder()}>Delete Seats</button>
                    </ModalFooter> 
                 </form>
            </Modal>


            <Snackbar
            open={isSnackBarShow}
            onClose={(e)=>closeSnack(e)}
            TransitionComponent="TransitionUp"
            message={SnackBarMessage}
            />

        </>
    )
}
