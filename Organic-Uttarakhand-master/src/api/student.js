import {serverApiUrl} from '../';

export const addStudent = (adminId,studentName,fatherName,permanentAddress,presentAddress,aadharNo,mobileNo,startTime,endTime,profileImg,aadharImg,examType,otherTypeExam,seatNo,callback) => 
{
    let formaData  = new FormData();
    formaData.append("admin_id",adminId);
    formaData.append("student_name",studentName);
    formaData.append("father_name",fatherName);
    formaData.append("permanent_address",permanentAddress);
    formaData.append("present_address",presentAddress);
    formaData.append("aadhar_no",aadharNo);
    formaData.append("mobile_no",mobileNo);
    formaData.append("start_time",startTime);
    formaData.append("end_time",endTime);
    formaData.append("profile_file",profileImg);
    formaData.append("aadhar_file",aadharImg);
    formaData.append("exam_type",examType);
    formaData.append("other_exam",otherTypeExam);
    formaData.append("seat_no",seatNo,);
    formaData.append("insert_student",true);
    fetch(serverApiUrl+"student_details.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}






export const editStudent = (studentId,adminId,studentName,fatherName,permanentAddress,presentAddress,aadharNo,mobileNo,startTime,endTime,profileImg,aadharImg,examType,otherTypeExam,seatNo,callback) => 
{
    let formaData  = new FormData();
    formaData.append("student_id",studentId);
    formaData.append("admin_id",adminId);
    formaData.append("student_name",studentName);
    formaData.append("father_name",fatherName);
    formaData.append("permanent_address",permanentAddress);
    formaData.append("present_address",presentAddress);
    formaData.append("aadhar_no",aadharNo);
    formaData.append("mobile_no",mobileNo);
    formaData.append("start_time",startTime);
    formaData.append("end_time",endTime);
    formaData.append("profile_file",profileImg);
    formaData.append("aadhar_file",aadharImg);
    formaData.append("exam_type",examType);
    formaData.append("other_exam",otherTypeExam);
    formaData.append("seat_no",seatNo,);
    formaData.append("update_student",true);
    fetch(serverApiUrl+"student_details.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}



export const lastStudentId = (adminId,callback) => 
{
    let formaData  = new FormData();
    formaData.append("admin_id",adminId);
    formaData.append("last_student_id",true);
    fetch(serverApiUrl+"student_details.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}


export const fetchEditDetails = (studentId,callback) => 
{
    let formaData  = new FormData();
    formaData.append("student_id",studentId);
    formaData.append("fetch_student_details",true);
    fetch(serverApiUrl+"student_details.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}



export const fetchStudent = (adminId,callback) => 
{
    let formaData  = new FormData();
    formaData.append("admin_id",adminId);
    formaData.append("fetch_student",true);
    fetch(serverApiUrl+"student_details.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}


export const deleteSingleStudent = (studentId,callback) => 
{
    let formaData  = new FormData();
    formaData.append("student_id",studentId);
    formaData.append("delete_student",true);
    fetch(serverApiUrl+"student_details.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}


export const searchSlot = (startTime,endTime,callback) => 
{
    let formaData  = new FormData();
    formaData.append("start_time",startTime);
    formaData.append("end_time",endTime);
    formaData.append("search_slots",true);
    fetch(serverApiUrl+"student_details.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}