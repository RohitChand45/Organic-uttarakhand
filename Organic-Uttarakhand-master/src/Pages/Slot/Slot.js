import React, { useState, useEffect } from 'react'
import RenderSingleSlot from './RenderSingleSlot'
import { Image, Shimmer } from 'react-shimmer'
import Snackbar from '@material-ui/core/Snackbar';
import {insertSlot,fetchSlots,deletesingleSlot} from '../../api/slot';
import { useSelector } from 'react-redux';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/modal/modal';
export default function Slot() {

    const adminDetails = useSelector(state=>state.ins.details);
    const [SlotData, setSlotData] = useState([]);
    const [offset, setOffset] = useState(0);

    const [icon, setIcon] = useState("")
    const [studentId, setstudentId] = useState("")
    const [studentName, setStudentName] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [showShimmer, setShowShimmer] = useState(true)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [isAddModalVisible,setisAddModalVisible]=useState(false)

    const fetchSlotCallback = (response) => {
        if (response.msg === "success") {
            setSlotData(response.data)
            setShowShimmer(false)
        }
    }


    useEffect(() => {
        fetchSlots(adminDetails.s_no,fetchSlotCallback)
        // fetch function
    },[])


    const deleteAtIndexCallback = (response,index) => {
        if (response.msg === "success") { 
            let instituteData_local = [...SlotData]
            instituteData_local.splice(index, 1);
            setSlotData(instituteData_local) 
            setSnackBarMessage("Slot Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }

    const deleteslot =(s_no,index)=>{ 
        deletesingleSlot(s_no,(response)=>deleteAtIndexCallback(response,index));
    }



    const addSlotCallback = (response) => {
        if (response.msg === "success") {
            setisAddModalVisible(false);
            
            setSnackBarMessage("Slot Added Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }


    const addStudentSlot = () => {

        if (window.confirm('Are you sure to Add a Seat')) {
            insertSlot(61,studentId, studentName, startTime,endTime,addSlotCallback);

        } else {
            console.log('cancel mission add seat', studentId, studentName)

        }

    }

    
    

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }


    return (
        <>

            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Slot Management</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered mb-0" id="table1">
                            <thead class="thead-dark">
                                <tr>
                                    <th align="center">#</th>
                                    <th align="center">Seat No</th>
                                    <th align="center">Student No</th>
                                    <th align="center">Start Time</th>
                                    <th align="center">End Time</th>
                                    <th align="center">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showShimmer ? (
                                    <td colspan="6">
                                        <Shimmer width={'100%'} height={40} />
                                    </td>
                                ) : (
                                    <>
                                        {SlotData && SlotData.map((row, i) => (
                                            <RenderSingleSlot row={row} index={i} deleteslot={deleteslot} />
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>




            <Modal
                visible={isAddModalVisible} 
                setModalVisible={setisAddModalVisible} 

                modalId={"testAddEditModal"} 
            >
                <form >
                    <ModalHeader>
                        <h5 className="modal-title">Add SLot</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>   
                    <ModalBody> 
                        <input type="number" class="form-control mt-3" onChange={e => setstudentId(e.target.value)} placeholder="Student No" />
                        <input type="text" class="form-control mt-3" onChange={e => setStudentName(e.target.value)} placeholder="Student Name" />
                        <input type="datetime-local" class="form-control mt-3" onChange={e => setStartTime(e.target.value)} placeholder="Start Time" />
                        <input type="datetime-local" class="form-control mt-3" onChange={e => setEndTime(e.target.value)} placeholder="End Time" />
                    </ModalBody>
                    <ModalFooter>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => addStudentSlot()}>Save changes</button>
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
