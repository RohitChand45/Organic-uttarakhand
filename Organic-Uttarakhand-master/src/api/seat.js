import {serverApiUrl} from '../'


export const insertSeats = (totalSeats,adminId,callback) => 
{
    let formaData  = new FormData();
    formaData.append("total_seats",totalSeats);
    formaData.append("admin_id",adminId);
    formaData.append("insert_seats",true);
    fetch(serverApiUrl+"seat_management.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}


export const fetchSeats = (adminId,callback) => 
{
    let formaData  = new FormData();
    formaData.append("admin_id",adminId);
    formaData.append("fetch_seats",true);
    fetch(serverApiUrl+"seat_management.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}


export const lastSeatNumber = (adminId,callback) => 
{
    let formaData  = new FormData();
    formaData.append("admin_id",adminId);
    formaData.append("last_seat_no",true);
    fetch(serverApiUrl+"seat_management.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}


export const deletemultipleSeats = (deleteSeats,callback) => 
{
    let formaData  = new FormData();
    formaData.append("delete_total",deleteSeats);
    formaData.append("delete_multiple_seats",true);
    fetch(serverApiUrl+"seat_management.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())                                                                                             
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}



export const deletesingleSeat = (deleteSeat,callback) => 
{
    let formaData  = new FormData();
    formaData.append("seat_no",deleteSeat);
    formaData.append("delete_seat",true);
    fetch(serverApiUrl+"seat_management.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}