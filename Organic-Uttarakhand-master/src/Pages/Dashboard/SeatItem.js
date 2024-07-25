import React from 'react'

function SeatItem(props) {

    const {item,index}=props;



    const switchSeatIcon=()=>
    {
        if(item.seat_student)
        {
            return(
                <div className="col-2 col-lg-2 col-xl-2">

                           
                            <div class="icon-box qp0pm4-0 pByfF" tabindex="694">
                                <span className="mb-0 mt-0 p-1 pr-2 pl-2 bg-primary radius-15" style={{color:'white'}}>{item.seat_number}</span>   
                                <div class="icon-box-inner  mt-0 pt-1">
                              
                                    <div class="icon-base"><i className="fadeIn animated bx bx-user-pin" style={{fontSize:50,color:'red'}}></i>
                                    </div>
                                    <div class="icon-box-name" style={{fontSize:13}}>{item.seat_student}</div>
                                </div>
                            </div>
                </div>
                    
            )
        }else
        {
            return(
                <div className="col-2 col-lg-2 col-xl-2" > 
                    <div class="icon-box qp0pm4-0 pByfF" tabindex="694">
                    <span className="mb-0 mt-0 p-1 pr-2 pl-2 bg-primary radius-15" style={{color:'white'}}>{item.seat_number}</span>   

                        <div class="icon-box-inner">
                            <div class="icon-base" > 
                            
                                <i class="fadeIn animated bx bx-message-alt" style={{fontSize:50,color:'green'}}>
                                   
                                </i>
                            
                            </div>
                            <div class="icon-box-name">Vacant</div>
                        </div>
                    </div> 
                </div>
                
            )
        }
    }
    return (
        switchSeatIcon()
    )
}

export default SeatItem
