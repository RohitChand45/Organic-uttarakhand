import {serverApiUrl} from '../'


export const insertSlot = (seatNo,studentId,startTime,endTime,callback) => 
{
    let formaData  = new FormData();
    formaData.append("seat_no",seatNo);
    formaData.append("student_id",studentId);
    formaData.append("start_time",startTime);
    formaData.append("end_time",endTime);
    formaData.append("insert_slot",true);
    fetch(serverApiUrl+"slot_management.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}



export const fetchSlots = (adminId,callback) => 
{
    let formaData  = new FormData();
    formaData.append("admin_id",adminId);
    formaData.append("fetch_slots",true);
    fetch(serverApiUrl+"slot_management.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}



export const deletesingleSlot = (s_no,callback) => 
{
    let formaData  = new FormData();
    formaData.append("slot_id",s_no);
    formaData.append("delete_slot",true);
    fetch(serverApiUrl+"slot_management.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}