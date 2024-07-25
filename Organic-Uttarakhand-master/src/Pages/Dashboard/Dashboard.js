import React, { useState, useEffect } from 'react';
import {totalStudent,totalSeats,occupiedSeats,seatDetails} from '../../api/dashboard';
import { useSelector } from 'react-redux';
import SeatItem from './SeatItem';

 

 const Dashboard = props => {
    
    const adminDetails = useSelector(state=>state.ins.details);
    const [totalStudents,setTotalStudents] = useState("")
    const [totalSeat,setTotalSeat] = useState("")
    const [occupiedSeat,setOccupiedSeat] = useState("")
    const [seatsData,setSeatsData] = useState([]);
    const totalStudentCallback = (response) =>{
      console.log(response);
      
      if(response.msg==="success"){
        setTotalStudents(response.data.total_count)
      }
    }

    const totalSeatsCallback = (response) =>{
      if(response.msg==="success"){
        setTotalSeat(response.data.total_count)
      }
    }

    const occupiedSeatsCallback = (response) =>{
      if(response.msg==="success"){
        setOccupiedSeat(response.data.total_count)
      }
    }
    const seatDetailsCallback=(response)=>
    {
        if(response.msg==="success")
        {
          setSeatsData(response.data)
          console.log(response)
        }
    }
    
    useEffect(()=>{
      totalStudent(adminDetails.s_no,totalStudentCallback);
      totalSeats(adminDetails.s_no,totalSeatsCallback);
      occupiedSeats(occupiedSeatsCallback);

      seatDetails(seatDetailsCallback)
    },[])

    return(
      <div>
        <section>
        <h3 class="mb-2">Summary </h3>
        <div className="row">
						<div className="col-12 col-lg-12 col-xl-12">
							<div className="card-deck flex-column flex-lg-row">
								<div className="card radius-15 bg-info">
									<div className="card-body text-center">
										<div className="widgets-icons mx-auto rounded-circle bg-white"><i className='bx bx-group'></i>
										</div>
										<h4 className="mb-0 font-weight-bold mt-3 text-white">{totalStudents}</h4>
										<p className="mb-0 text-white">Total Students</p>
									</div>
								</div>
								<div className="card radius-15 bg-wall">
									<div className="card-body text-center">
										<div className="widgets-icons mx-auto bg-white rounded-circle"><i className="fadeIn animated bx bx-chair"></i>
										</div>
										<h4 className="mb-0 font-weight-bold mt-3 text-white">{totalSeat}</h4>
										<p className="mb-0 text-white">Total Seats</p>
									</div>
								</div>
								<div className="card radius-15 bg-rose">
									<div className="card-body text-center">
										<div className="widgets-icons mx-auto bg-white rounded-circle"><i class="fadeIn animated bx bx-timer"></i>
										</div>
										<h4 className="mb-0 font-weight-bold mt-3 text-white">{occupiedSeat}</h4>
										<p className="mb-0 text-white">Currently Filled Seats</p>
									</div>
								</div>
							</div>
						</div>
        </div>
        </section>
        <section>
          
        <h3 class="mb-2 mt-3">Seat Chart</h3>
          <div className="card radius-15">
            <div className="card-body">
                <div className="row d-flex justify-content-center align-items-center">
                  
                    {seatsData.map((item,index)=>(

                      <SeatItem item={item} index={index}/>
                    ))}
                </div>
              </div>
            </div>
        </section>      

      </div>
      )
      
    }
export default Dashboard  