import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { SET_ADMIN_DETAILS, SET_AUTH_STATUS } from '../../Reducers/types';
import {Link, Redirect,useHistory} from 'react-router-dom'
import { login } from '../../api/auth';
 
const Login= props => 
{
    
    const [name, setName]=useState(""); 
    const [password, setPassword]=useState("");
    const [redirect, setRedirect]=useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const loginCallback=(response)=>
    {
        // console.log(response.data)
        if(response.msg==="success")
        {
            dispatch({type:SET_AUTH_STATUS,payload:{authStatus:true}})
            dispatch({type:SET_ADMIN_DETAILS,payload:{details:response.data}})
            history.push("/seat");
        }
    }
    const onLoginClickhanlder=()=>
    {
        login(name, password, loginCallback)
    }

    return(
            <div class="wrapper">
                <div class="section-authentication-login d-flex align-items-center justify-content-center">
                    <div class="row">
                        <div class="col-12 col-lg-10 mx-auto">
                            <div class="card radius-15">
                                <div class="row no-gutters">
                                    <div class="col-lg-6">
                                        <div class="card-body p-md-5">
                                            <div class="text-center">
                                                <img src="assets/images/logo-icon.png" width="80" alt=""/>
                                                <h3 class="mt-4 font-weight-bold">Welcome Back</h3>
                                            </div>
                                            <div class="input-group shadow-sm rounded mt-5">
                                            </div>
                                            <div class="form-group mt-4">
                                                <label>Email Address</label>
                                                <input type="text" class="form-control" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} />
                                            </div>
                                            <div class="form-group">
                                                <label>Password</label>
                                                <input type="password" class="form-control" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
                                            </div>
                                            <div class="btn-group mt-3 w-100">
                                                <button onClick={onLoginClickhanlder} type="button" class="btn btn-primary btn-block" >Log In</button>
                                                <button onClick={onLoginClickhanlder} type="button" class="btn btn-primary"><i class="lni lni-arrow-right"></i>
                                                </button>
                                            </div>
                                            <hr/>
                                            <p>Don't have an account?<Link> SignUp</Link></p>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <img src="assets/images/login-images/login-frent-img.jpg" class="card-img login-img h-100" alt="..."/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
    )
}
export default Login