import {serverApiUrl} from '../'


export const totalStudent = (adminId,callback) => 
{
    let formaData = new FormData();
    formaData.append("admin_id",adminId);
    formaData.append("total_student",true);
    fetch(serverApiUrl+"dashboard.php",{
        method: 'POST', 
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}



export const totalSeats = (adminId,callback) => 
{
    let formaData = new FormData();
    formaData.append("admin_id",adminId);
    formaData.append("total_seats",true);
    fetch(serverApiUrl+"dashboard.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}


export const occupiedSeats = (callback) => 
{
    let formaData = new FormData();
    formaData.append("occupied_seats",true);
    fetch(serverApiUrl+"dashboard.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}


export const seatDetails = (callback) => 
{
    let formaData = new FormData();
    formaData.append("seat_details",true);
    fetch(serverApiUrl+"dashboard.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}