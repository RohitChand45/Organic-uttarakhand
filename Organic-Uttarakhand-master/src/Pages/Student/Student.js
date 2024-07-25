import React, { useState, useEffect, useRef } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useSelector } from 'react-redux';
import profile from '../../assets/images/profile_default.png';
import aadhar from '../../assets/images/aadhar_default.png';
import { addStudent,lastStudentId,searchSlot,fetchEditDetails,editStudent} from '../../api/student';
import {insertSlot,fetchSlots,deletesingleSlot} from '../../api/slot';
import { serverBaseUrl } from '../..';

export default function Student(props) {
    const {match}= props;
    const {params}=match
    const adminDetails = useSelector(state=>state.ins.details);
    const [studentId, setstudentId] = useState("") 
    const [studentName, setStudentName] = useState("") 
    const [fatherName, setFatherName] = useState("")
    const [permanentAddress, setPermanentAddress] = useState("")
    const [presentAddress, setPresentAddress] = useState("")
    const [aadharNo, setAadharNo] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [profileImg,setProfileImg] = useState("")
    const [aadharImg,setAadharImg] = useState("")
    const [profileImgDisplay,setProfileImgDisplay] = useState(profile)
    const [aadharImgDisplay,setAadharImgDisplay] = useState(aadhar)
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [examType,setExamType] = useState([])
    const [otherTypeExam,setOtherTypeExam] = useState("")
    const [mode,setMode] = useState("add");
    const [buttonType,setButtonType] = useState("Add");
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [emptySlots,setEmptySlots] = useState([])
    const [seatNo,setSeatNo] = useState(null)
    const[showSelectForSlot, setShowSelectForSlot] = useState(false)
    
    const mylabel = {color: "#5c00e6"};
    const border = {border: "2px solid #d1b3ff",padding: "30px",borderRadius:"10px"};
    const profileimg = {height: "150px",width: "auto"}
    const aadharimg = {height: "120px",width: "auto"}
    let studentImageRef = useRef()
    let studentaadharImageRef = useRef()
  
    const setExamTypeFun=(value)=>
    {
            let examType_arr = [...examType];
            if(examType_arr.includes(value))
            {
                examType_arr = examType_arr.filter((item)=>item!==value)
            }
            else
            {
                examType_arr.push(value)
            }
            setExamType(examType_arr);
            console.log("setExamType",examType_arr)
    }

    const profileImagHandler = (e)=>{
        if(e.target.files[0])
        {
            setProfileImgDisplay(URL.createObjectURL(e.target.files[0]))
            setProfileImg(e.target.files[0]);
        }
    }

    const aadharImagHandler = (e)=>{
        if(e.target.files[0])
        {
            setAadharImgDisplay(URL.createObjectURL(e.target.files[0]))
            setAadharImg(e.target.files[0]);
        }
    }

    const lastStudentIdCallback =(response)=>{
        if(response.msg==="success"){
            setstudentId(response.data.id);
        }
    }

    const fetchEditDetailsCallback=(response)=>{
        if(response.msg==="success"){
            setStudentName(response.data.name);
            setFatherName(response.data.f_name);
            setPermanentAddress(response.data.permanent_add);
            setPresentAddress(response.data.present_add);
            setAadharNo(response.data.aadhar_no);
            setMobileNo(response.data.mobile_no);
            setStartTime(response.data.start_time);
            setEndTime(response.data.end_time);
            setProfileImg(response.data.profile_file);
            setProfileImgDisplay(serverBaseUrl+response.data.profile_file);
            setAadharImgDisplay(serverBaseUrl+response.data.aadhar_file);
            setExamType(response.data.exam_type.split(","));
            setOtherTypeExam(response.data.other_exam);
            setSeatNo(response.data.seat_no);
        }
    }

    useEffect(()=>{
        lastStudentId(adminDetails.s_no,lastStudentIdCallback);
        if(params.id)
        {   
            setMode("edit");
            //api which will fetch details of user with id params.id
            fetchEditDetails(params.id,fetchEditDetailsCallback);
            setButtonType("Edit");
        }
    },[params.id])


    const addstudentCallback = (response) => {
        if (response.msg === "success") {
            setSnackBarMessage("Student Added Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }

    const editstudentCallback = (response) => {
        if (response.msg === "success") {
            setSnackBarMessage("Student Edited Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }

    const addEditStudentHandler = ()=>{
        if(seatNo){
           if(mode==="add"){
            addStudent(adminDetails.s_no,studentName,fatherName,permanentAddress,presentAddress,aadharNo,mobileNo,startTime,endTime,profileImg,aadharImg,examType,otherTypeExam,seatNo,addstudentCallback)
            }
            if(mode==="edit"){
                editStudent(params.id,adminDetails.s_no,studentName,fatherName,permanentAddress,presentAddress,aadharNo,mobileNo,startTime,endTime,profileImg,aadharImg,examType,otherTypeExam,seatNo,editstudentCallback)
            } 
        }
        else{
            setSnackBarMessage("Select the time slot first !!")
            setIsSnackBarShow(true)
        }  
    }

    const searchSlotCallback = (response) => {
        console.log(response.data)
        if(response.msg === "success"){
            setEmptySlots(response.data)
            setShowSelectForSlot(true);
        }
        else{
            setSnackBarMessage("No seats are available");
            setIsSnackBarShow(true)
        }
    }

    const searchSlotHandler = ()=>{
        searchSlot(startTime,endTime,searchSlotCallback);
    }

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    } 

    return(

        <div className="wrapper container ">
            <div className="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div className="breadcrumb-title pr-3">{buttonType} Student details</div>
                <div className="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item"><a href="javascript:;"><i className='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <form>
                <div className="container mt-5" style={border}>
                    <div className="row">
                        {mode==="edit"?(
                            <div className="col-3 form-floating mb-3 mt-2">
                             <h6><label for="studentNo">Student ID : {params.id}</label></h6>
                            </div>
                        ):(null)}
                        
                        <div className="col">
                            <button className="float-right" type="button" onClick={()=>{studentImageRef.click()}} style={{backgroundColor:"transparent",border:"none"}}>
                                <img style={profileimg}  src={profileImgDisplay}  alt="chsssk"/>
                            </button>
                            <input type="file" ref={ref =>studentImageRef=ref} id="my_file" style={{visibility: "hidden"}} onChange={(e)=>profileImagHandler(e)}/>
                        </div>
                    </div>

                    <h5 className="mt-3">Exam Preparing for :</h5>
                    <div className="row">
                        <div className="col-2">
                            <div className="form-check mt-1">
                                <input className="form-check-input" type="checkbox" value="1" id="flexCheckDefault1" checked={examType.includes("1")}   onChange={(e)=>setExamTypeFun(e.target.value)}></input>
                                <label className="form-check-label" for="flexCheckDefault1">I.Sc</label>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-check mt-1">
                                <input className="form-check-input" type="checkbox" value="2" id="flexCheckDefault2" checked={examType.includes("2")}   onChange={(e)=>setExamTypeFun(e.target.value)}></input>
                                <label className="form-check-label" for="flexCheckDefault2">IIT / Medical</label>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-check mt-1">
                                <input className="form-check-input" type="checkbox" value="3" id="flexCheckDefault3" checked={examType.includes("3")}   onChange={(e)=>setExamTypeFun(e.target.value)}></input>
                                <label className="form-check-label" for="flexCheckDefault3">Competition</label>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-check mt-1">
                                <input className="form-check-input" type="checkbox" value="4" id="flexCheckDefault4" checked={examType.includes("4")}   onChange={(e)=>setExamTypeFun(e.target.value)}></input>
                                <label className="form-check-label" for="flexCheckDefault4">BPSC / UPSC</label>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-check">
                                <input type="text" className="form-control" value={otherTypeExam} onChange={e => setOtherTypeExam(e.target.value)} placeholder="Other" />
                            </div>
                        </div>
                    </div>
                
                    <div className="row mt-4" style={mylabel}>
                        <div className="col-6 form-floating mb-3 mt-2">
                            <b><label for="studentName">Student Name</label></b>
                            <input type="text" className="form-control" id="studentName" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Student Name" />
                        </div>
                        <div className="col-6 form-floating mb-3 mt-2">
                            <b><label for="studentName">Father's Name</label></b>
                            <input type="text" className="form-control" id="studentName" value={fatherName} onChange={e => setFatherName(e.target.value)} placeholder="Father's Name" />
                        </div>
                    </div>

                    <div className="row" style={mylabel}>
                        <div className="col form-floating mb-3 mt-2">
                            <b><label for="permanentAddress">Permanent Address</label></b>
                            <textarea className="form-control" placeholder="Permanent address" value={permanentAddress} id="permanentAddress" onChange={e => setPermanentAddress(e.target.value)}></textarea>
                        </div>
                        <div className="col form-floating mb-3 mt-2">
                            <b><label for="presentAddress">Present Address</label></b>
                            <textarea className="form-control" placeholder="Present address" value={presentAddress} id="presentAddress" onChange={e => setPresentAddress(e.target.value)}></textarea>
                        </div>
                    </div>

                    <div className="row" style={mylabel}>
                        <div className="col form-floating mb-3 mt-2">
                            <b><label for="aaadharNo">Aadhar No.</label></b>
                            <input type="number" className="form-control" value={aadharNo} onChange={e => setAadharNo(e.target.value)} placeholder="Aadhar No" id="aaadharNo"/>
                        </div>
                        <div className="col form-floating mb-3 mt-2">
                            <b><label for="mobileNo">Mobile No.</label></b>
                            <input type="number" className="form-control" value={mobileNo} onChange={e => setMobileNo(e.target.value)} placeholder="Mobile No" id="mobileNo"/>
                        </div>
                    </div>

                    <div className="row mt-2" style={mylabel}>
                        <div className="col form-floating mb-3 mt-2">
                            <b><label for="startTime">Start Time</label></b>
                            <input type="time" className="form-control" value={startTime} onChange={e => setStartTime(e.target.value)} placeholder="Start Time" id="startTime"/>
                        </div>
                        <div className="col form-floating mb-3 mt-2">
                            <b><label for="endTime">End Time</label></b>
                            <input type="time" className="form-control" value={endTime} onChange={e => setEndTime(e.target.value)} placeholder="End Time" id="endTime"/>
                        </div>
                    </div>

                    <div className="row mt-2">
                        {mode==="edit"?(
                            <div className="col-8 form-floating mb-3 mt-2 ">
                                <h6 className="float-right"><label for="studentNo">Seat No : {seatNo}</label></h6>
                            </div>
                        ):(null)}
                        <div className="col">
                            <button onClick={searchSlotHandler} class="btn btn-secondary dropdown-toggle float-right" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Search Available Slots
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col">
                            {showSelectForSlot?(
                                emptySlots?(
                                    <select className="form-control" onChange={(e) =>setSeatNo(e.target.value)} >
                                        <option value={null}>Select</option>
                                            
                                        {emptySlots.map((item,i)=>(
                                            <option value={item.s_no} selected={item.s_no==seatNo}>{item.seat_number}</option>
                                        ))}
                                    </select>
                                ):(<div class="alert alert-danger" role="alert">
                                No slots are available . 
                              </div>)
                            ):(null)}
                            
                        </div>
                    </div>
                        
                    <b style={mylabel} className="ml-3"><label for="endTime">Aadhar Card :</label></b>
                    <div className="row ">
                        <div className="col">
                            <button className="float-left" type="button" onClick={()=>{studentaadharImageRef.click()}} style={{backgroundColor:"transparent",border:"none"}}>
                                <img style={aadharimg}  src={aadharImgDisplay}  alt="chsssk"/>
                            </button>
                            <input type="file" ref={ref =>studentaadharImageRef=ref} id="my_file" style={{visibility: "hidden"}} onChange={(e)=>aadharImagHandler(e)}/>
                        </div>
                    </div>

                    
                    <div className="btn-group mt-5 w-100">
                        <button type="button" onClick={addEditStudentHandler} className="btn btn-primary btn-block" >{buttonType} Student</button>
                        <button  type="button" className="btn btn-primary"><i className="lni lni-arrow-right"></i></button>
                    </div>

                </div>
            </form>

            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
    )
}
