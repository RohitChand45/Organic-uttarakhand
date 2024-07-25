import {serverApiUrl} from '../'


export const login = (name ,password,callback) => 
{
    let formaData  = new FormData();
    formaData.append("name",name);
    formaData.append("password",password);
    formaData.append("login",true);
    fetch(serverApiUrl+"login.php",{
        method: 'POST',
        body:formaData
    }).then(response =>response.json())
    .then(response=>callback(response))
    .catch(errr=>console.log(errr))
}