import React, { useState, useEffect } from 'react'
import RenderSingleStudent from './RenderSingleStudent'
// import { fetch_categoriesAll, addCategory } from '../../api/institute'
import { Image, Shimmer } from 'react-shimmer'
import Snackbar from '@material-ui/core/Snackbar';
import {fetchStudent,deleteSingleStudent} from '../../api/student';
import { useSelector } from 'react-redux';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/modal/modal';
import { Link } from "react-router-dom"

export default function Slot() {

    const adminDetails = useSelector(state=>state.ins.details);
    const [StudentData, setStudentData] = useState([]);
    const [showShimmer, setShowShimmer] = useState(true)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)

    const fetchStudentCallback = (response) => {
        if (response.msg === "success") {
            setStudentData(response.data)
            setShowShimmer(false)
        }
    }


    useEffect(() => {
        fetchStudent(adminDetails.s_no,fetchStudentCallback)
        // fetch function
    },[])


    const deleteAtIndexCallback = (response,index) => {
        if (response.msg === "success") { 
            let instituteData_local = [...StudentData]
            instituteData_local.splice(index, 1);
            setStudentData(instituteData_local) 
            setSnackBarMessage("Student Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }

    const deleteStudent =(student_id,index)=>{ 
        deleteSingleStudent(student_id,(response)=>deleteAtIndexCallback(response,index));
    }

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }


    return (
        <>

            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Student Management</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="ml-auto">
                    <Link to={"/student"}>
                        <button class="btn btn-primary">Add</button>
                    </Link>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered mb-0" id="table1">
                            <thead class="thead-dark">
                                <tr>
                                    <th align="center">S.No</th>
                                    <th align="center">Name</th>
                                    <th align="center">Father Name</th>
                                    <th align="center">Studnet Id</th>
                                    <th align="center">Present Address</th>
                                    <th align="center">Mobile No</th>
                                    <th align="center">Seat Number</th>
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
                                        {StudentData && StudentData.map((row, i) => (
                                            <RenderSingleStudent row={row} index={i} deleteStudent={deleteStudent} />
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </>
    )
}
